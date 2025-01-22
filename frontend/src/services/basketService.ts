import axios from 'axios';
import { Request, Basket } from '../types';


const baseUrl = 'http://localhost:3000/api/baskets'; //import.meta.env.BASE_URL;

// get all requests for a basket (READ)
function getBasketRequests(id: string) {
  return axios.get<Request[]>(baseUrl + "/" +  String(id))
    .then(response => response.data);
}
/*array of
  {
    id: string,
    basket_id: string,
    path: strig,
    method: string,
    headers : customObject,
    query_params: customObject,
    created_at: string,
    body: customObject
  }
*/

// get all basket names (READ)
function getAllBaskets() {
  return axios.get<Basket[]>(baseUrl)
    .then(response => response.data);
} // array of { basket_name: string }

// delete a basket (DELETE)
function deleteBasket(id: string) {
  return axios.delete(baseUrl + "/" + String(id))
    .catch(error => console.error('An error has occurred while deleting Basket', error.message));
}

// create a basket (CREATE)
function createBasket() {
  return axios.post(baseUrl)
    .then(response => {
      console.log("CreateBasket response data:", response.data);
      return response.data
    })
    .catch(error => {
      console.error('An error has occurred!!!:', error.message);
    });
}

// {
//   "basket_name": "/basket/d0f10046-d",
//   "basket_url": "/web/d0f10046-d"
// }

// clear all requests for a baskets (UPDATE by clearing)
function deleteAllRequests(id: string) {
  return axios.delete(baseUrl + "/" + String(id) + "/requests");
}


export default {
  getBasketRequests,
  getAllBaskets,
  deleteBasket,
  createBasket,
  deleteAllRequests,
}
