import { pool } from "./sql_connection";
import { Baskets, JsonBody, NewRequest, Requests } from "../types";
import { v4 as uuidv4 } from "uuid";

const getAllBaskets = async (): Promise<Baskets[]> => {
  try {
    const result = await pool.query("SELECT basket_name FROM baskets");
    return result.rows as Baskets[];
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `There was an error fetching the baskets from the database ${err.message}`
      );
    } else {
      throw new Error("Error");
    }
  }
};

const getBasketRequests = async (basket_name: string): Promise<Requests[]> => {
  try {
    const result = await pool.query<Requests>(
      `SELECT * FROM requests WHERE basket_id = $1`,
      [basket_name]
    );
    return result.rows;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `There was an error fetching the baskets from the database ${err}`
      );
    } else {
      throw new Error("Error");
    }
  }
};

const deleteBasket = async (basket_name: string): Promise<string> => {
  try {
    const result = await pool.query(
      `DELETE FROM baskets WHERE basket_name = $1`,
      [basket_name]
    );
    return `${result.rowCount} basket was deleted`;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `There was an error deleting the baskets from the database ${err.message}`
      );
    } else {
      throw new Error("Error");
    }
  }
};

const deleteRequests = async (basket_name: string): Promise<string> => {
  try {
    const result = await pool.query(
      `DELETE FROM requests WHERE basket_id = $1`,
      [basket_name]
    );
    return `${result.rowCount} requests were deleted`;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `There was an error deleting requests from the database ${err.message}`
      );
    } else {
      throw new Error("Error");
    }
  }
};

const addNewBasket = async (basket_name: string): Promise<JsonBody> => {
  try {
    await pool.query(`INSERT INTO baskets VALUES ($1)`, [basket_name]);
    return { 
      basket_name: `/basket/${basket_name}`,
      basket_url: `/web/${basket_name}`
    };
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `There was an error fetching the baskets from the database ${err}`
      );
    } else {
      throw new Error("Error");
    }
  }
};

const addRequest = async (requestObj: NewRequest): Promise<string> => {
  try {
    await pool.query(
      `INSERT INTO requests (id, basket_id, path, method, headers, query_params)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        requestObj.id,
        requestObj.basket_id,
        requestObj.path,
        requestObj.method,
        requestObj.headers,
        requestObj.query_params
      ]
    );

    console.log(
      `A new request was create with basketname: ${requestObj.basket_id} and id: ${requestObj.id}`
    );
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `There was an error adding a new request the baskets from the database ${err.message}`
      );
    } else {
      throw new Error("Error");
    }
  }

  return "hey";
};

const getAllRequestIds = async (): Promise<Requests[]> => {
  try {
    const result = await pool.query<Requests>("SELECT id FROM requests");
    return result.rows;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(
        `There was an error fetching the requests from the database ${err.message}`
      );
    } else {
      throw new Error("Error");
    }
  }
};

const generateId = () => {
  const uuid = uuidv4();
  return uuid.slice(0, 10);
};

const existingBasket = async (newBasket:string) => {
  const basketIds = await getAllBaskets();
  return basketIds.map((obj) => obj.basket_name).includes(newBasket);
};

const generateBasketId = async (): Promise<string> => {
  let newBasket = generateId();
  while (await existingBasket(newBasket)) {
    newBasket = generateId();
  }

  return newBasket;
};

const generateRequestId = async (): Promise<string> => {
  let requestId = generateId();
  const ids = await getAllRequestIds();

  while (ids.map((obj) => obj.id).includes(requestId)) {
    requestId = generateId();
  }
  return requestId;
};

export default {
  getAllBaskets,
  getBasketRequests,
  deleteBasket,
  addRequest,
  addNewBasket,
  getAllRequestIds,
  generateBasketId,
  generateRequestId,
  existingBasket,
  deleteRequests
};
