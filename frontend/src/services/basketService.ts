import axios from 'axios';
import { Request, Basket } from '../types';


const baseUrl = 'http://localhost:3000/api/baskets'; //import.meta.env.BASE_URL;

// get all requests for a basket (READ)
function getBasketRequests(id: string) {
  return axios.get<Request[]>(baseUrl + "/" +  String(id))
    .then(response => response.data);
}

// get all basket names (READ)
function getAllBaskets() {
  return axios.get<Basket[]>(baseUrl)
    .then(response => response.data);
    // this will be given as array of string names
}

// delete a basket (DELETE)
function deleteBasket(id: string) {
  return axios.delete(baseUrl + "/" + String(id))
    .catch(error => console.error('An error has occurred while deleting Basket', error.message));
}

// create a basket (CREATE)
function createBasket() {
  return axios.post(baseUrl)
    .then(response => {
      console.log('A new basket was created! Rejoice!!!');
      console.log("CreateBasket response data:", response.data);
      return response.data
    })
    .catch(error => {
      console.error('An error has occurred!!!:', error.message);
    });
}

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
