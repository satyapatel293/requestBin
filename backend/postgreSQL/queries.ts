import { client } from "./sql_connection";
import { Baskets, NewRequest, Requests } from "../types";

const getAllBaskets = async (): Promise<Baskets[]> => {
  try {
    const result = await client.query("SELECT basket_name FROM baskets");
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

const getBasketRequests = async (basket_id: string): Promise<Requests[]> => {
  try {
    const result = await client.query(
      `SELECT * FROM requests WHERE basket_id = $1`,
      [basket_id]
    );
    return result.rows as Requests[];
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

const deleteBasket = async (basket_id: string): Promise<string> => {
  try {
    const result2 = await client.query(
      `DELETE FROM baskets WHERE basket_name = $1`,
      [basket_id]
    );
    const result = await client.query(
      `DELETE FROM requests WHERE basket_id = $1`,
      [basket_id]
    );
    return `${result.rowCount}, ${result2.rowCount} rows were deleted`;
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


const addNewBasket = async (basket_id: string): Promise<string> => {
  try {
    const result = await client.query(`INSERT INTO baskets VALUES ($1)`, [
      basket_id,
    ]);
    return `${result.rowCount} row was added`;
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
    await client.query(
      `INSERT INTO requests (id, basket_id, path, method, headers)
      VALUES ($1, $2, $3, $4, $5)`,
      [
        requestObj.id,
        requestObj.basket_id,
        requestObj.path,
        requestObj.method,
        requestObj.headers,
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

const getAllRequestIds = async (): Promise<Requests[]>  => {
  try {
    const result = await client.query("SELECT id FROM requests");
    return result.rows as Requests[];
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



export default {
  getAllBaskets,
  getBasketRequests,
  deleteBasket,
  addRequest,
  addNewBasket,
  getAllRequestIds
};
