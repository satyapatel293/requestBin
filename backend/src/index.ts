import express from "express";
import cors from "cors";
import { JsonBody } from "../types";
import { connectDB } from "../postgreSQL/sql_connection";
import sqlService from "../postgreSQL/queries";
import mongoService from "../mongoDB/mongoService";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

connectDB()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    if (err instanceof Error) {
      throw new Error("Error connecting to postgreSQL");
    } else {
      throw new Error("Error");
    }
  });

// Get all basket names
app.get("/api/baskets", async (_req, res) => {
  try {
    const basketNames = await sqlService.getAllBaskets();
    res.json(basketNames);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred fetching all the baskets");
  }
});

// Get all request associated with a basket
app.get("/api/baskets/:basket_name", async (_req, res) => {
  try {
    const basketName = _req.params.basket_name;
    const allRequests = await sqlService.getBasketRequests(basketName);
    const requestBodies = await mongoService.findBodies(basketName);

    const formattedRequests = allRequests.map((currRequest) => {
      const currBody = requestBodies.find(
        (body) => body.request_id === currRequest.id
      );
      const body = currBody?.body || "{}";
      return {
        ...currRequest,
        query_params: JSON.parse(currRequest.query_params) as JsonBody,
        body: JSON.parse(body) as JsonBody,
        headers: JSON.parse(currRequest.headers) as JsonBody,
      };
    });

    res.json(formattedRequests);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred fetching a single basket");
  }
});

// Add a new basket
app.post("/api/baskets", async (_req, res) => {
  try {
    const newBasket = await sqlService.generateBasketId();
    const basketLinks = await sqlService.addNewBasket(newBasket);
    res.json(basketLinks);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred creating your basket");
  }
});

// Delete a basket 
app.delete("/api/baskets/:basket_name", async (_req, res) => {
  try {
    const basketName = _req.params.basket_name;
    await sqlService.deleteBasket(basketName);
    await mongoService.deleteBodies(basketName);
    res.status(200).send("Deleted Basket");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred deleting a basket with requests");
  }
});

// Add a new request to a basket 
app.all("/basket/:basket_name", async (req, res) => {
  try {
    const currentBasketName = req.params.basket_name;
    if (await sqlService.existingBasket(currentBasketName)) {
      const requestId = await sqlService.generateRequestId();
      await mongoService.addBody(requestId, currentBasketName, JSON.stringify(req.body));
      await sqlService.addRequest({
        id: requestId,
        basket_id: currentBasketName,
        method: req.method,
        path: req.path,
        headers: JSON.stringify(req.headers),
        query_params: JSON.stringify(req.query),
      });
      console.log("posted request to db");
      res.status(200);
    } else {
      console.log("BAD request to get url");
      res.status(404).send("No basket with that name was found!");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error getting url");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
