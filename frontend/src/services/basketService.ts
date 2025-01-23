import axios from 'axios';
import { Request, Basket } from '../types';


const baseUrl = import.meta.env.VITE_API_ROUTES;

function getBasketRequests(id: string) {
  return axios.get<Request[]>(baseUrl + "/" +  String(id))
    .then(response => response.data);
}

function getAllBaskets() {
  return axios.get<Basket[]>(baseUrl)
    .then(response => response.data);
}

function deleteBasket(id: string) {
  return axios.delete(baseUrl + "/" + String(id))
    .catch(error => console.error('An error has occurred while deleting Basket', error.message));
} 

function createBasket() {
  return axios.post(baseUrl)
    .then(response => {
      return response.data
    })
    .catch(error => {
      console.error('An error has occurred!!!:', error.message);
    });
}


function deleteAllRequests(id: string) {
  return axios.delete(baseUrl + "/" + String(id) + "/requests");
} // returns nothing


export default {
  getBasketRequests,
  getAllBaskets,
  deleteBasket,
  createBasket,
  deleteAllRequests,
}
