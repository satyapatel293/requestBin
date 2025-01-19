import { client } from './sql_connection';

interface Baskets {
    basket_name: string,
}

interface Headers {
    [key: string]: string
}

interface Requests {
  id: string | number, 
  basket_id: string,
  path: string,
  method: string, 
  headers: Headers
}

export const getAllBaskets = async (): Promise<Baskets[]> => {
    try {
        const result = await client.query('SELECT * FROM baskets');
        return result.rows as Baskets[];
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`There was an error fetching the baskets from the database ${err}`);
      } else {
        throw new Error('Error');
      }
    }
};

export const getSingleBasketRequests = async(basket_id: string): Promise<Requests[]> => {
  try {
    const result = await client.query(`SELECT * FROM requests WHERE basket_id = '${basket_id}'`);
    return result.rows as Requests[];
  } catch(err) {
    if (err instanceof Error) {
        throw new Error(`There was an error fetching the baskets from the database ${err}`);
    } else {
        throw new Error('Error');
    }
  }
};

export const deleteBasket = async(basket_id: string): Promise<string> => {
    try {
      const result = await client.query(`DELETE FROM requests WHERE basket_id = '${basket_id}'`);
      const result2 = await client.query(`DELETE FROM baskets WHERE basket_name = '${basket_id}'`);
      return `${result.rowCount}, ${result2.rowCount} rows were deleted`;
    } catch(err) {
      if (err instanceof Error) {
          throw new Error(`There was an error fetching the baskets from the database ${err}`);
      } else {
          throw new Error('Error');
      }
    }
  };
  

//   export const AddnewRequest = async(basket_id: string): Promise<string> => {
//     try {

//     } catch(err) {

//     }
//   };
  

  export const addNewBasket = async(basket_id: string): Promise<string> => {
    try {
        const result = await client.query(`INSERT INTO baskets VALUES ('${basket_id}')`);
        return `${result.rowCount} row was added`;
    } catch(err) {
        if (err instanceof Error) {
            throw new Error(`There was an error fetching the baskets from the database ${err}`);
        } else {
            throw new Error('Error');
        }
    }
  };
  