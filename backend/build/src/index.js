"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sql_connection_1 = require("../postgreSQL/sql_connection");
const queries_1 = __importDefault(require("../postgreSQL/queries"));
const mongoService_1 = __importDefault(require("../mongoDB/mongoService"));
const PORT = 3001;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, sql_connection_1.connectDB)()
    .then(() => {
    console.log("Database connected successfully");
})
    .catch((err) => {
    if (err instanceof Error) {
        throw new Error("Error connecting to postgreSQL");
    }
    else {
        throw new Error("Error");
    }
});
// Get all basket names
app.get("/api/baskets", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const basketNames = yield queries_1.default.getAllBaskets();
        res.json(basketNames);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("An error occurred fetching all the baskets");
    }
}));
// Get all request associated with a basket
app.get("/api/baskets/:basket_name", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const basketName = _req.params.basket_name;
        const allRequests = yield queries_1.default.getBasketRequests(basketName);
        const requestBodies = yield mongoService_1.default.findBodies(basketName);
        const formattedRequests = allRequests.map((currRequest) => {
            const currBody = requestBodies.find((body) => body.request_id === currRequest.id);
            const body = (currBody === null || currBody === void 0 ? void 0 : currBody.body) || "{}";
            return Object.assign(Object.assign({}, currRequest), { query_params: JSON.parse(currRequest.query_params), body: JSON.parse(body), headers: JSON.parse(currRequest.headers) });
        });
        res.json(formattedRequests);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("An error occurred fetching a single basket");
    }
}));
// Add a new basket
app.post("/api/baskets", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBasket = yield queries_1.default.generateBasketId();
        const basketLinks = yield queries_1.default.addNewBasket(newBasket);
        res.json(basketLinks);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("An error occurred creating your basket");
    }
}));
// Delete a basket 
app.delete("/api/baskets/:basket_name/requests", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const basketName = _req.params.basket_name;
        yield queries_1.default.deleteRequests(basketName);
        yield mongoService_1.default.deleteBodies(basketName);
        res.status(200).send("Deleted Requests");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("An error occurred deleting requests in basket");
    }
}));
// Delete a basket 
app.delete("/api/baskets/:basket_name", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const basketName = _req.params.basket_name;
        yield queries_1.default.deleteBasket(basketName);
        yield mongoService_1.default.deleteBodies(basketName);
        res.status(200).send("Deleted Basket");
    }
    catch (err) {
        console.error(err);
        res.status(500).send("An error occurred deleting a basket with requests");
    }
}));
// Add a new request to a basket 
app.all("/basket/:basket_name", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentBasketName = req.params.basket_name;
        if (yield queries_1.default.existingBasket(currentBasketName)) {
            const requestId = yield queries_1.default.generateRequestId();
            yield mongoService_1.default.addBody(requestId, currentBasketName, JSON.stringify(req.body));
            yield queries_1.default.addRequest({
                id: requestId,
                basket_id: currentBasketName,
                method: req.method,
                path: req.path,
                headers: JSON.stringify(req.headers),
                query_params: JSON.stringify(req.query),
            });
            console.log("posted request to db");
            res.status(200);
        }
        else {
            console.log("BAD request to get url");
            res.status(404).send("No basket with that name was found!");
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal server error getting url");
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
