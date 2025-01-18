import axios from 'axios';
import { Request } from '../types';


const baseUrl = import.meta.env.BASE_URL;

// get all requests for a basket (READ)
function getBasketRequests(id: string) {
  return axios.get<Request[]>(baseUrl + "/" +  String(id))
    .then(response => response.data);
}

// get all basket names (READ)
function getAllBaskets() {
  return axios.get<String[]>(baseUrl)
    .then(response => response.data);
}

// delete a basket (DELETE)
function deleteBasket(id: string) {
  return axios.delete(baseUrl + "/" + String(id));
}

// create a basket (CREATE)
function createBasket(id: string) {
  return axios.post(baseUrl, { id })
    .then(response => response.data);
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
