import axios from 'axios';
import { Request } from '../types';


const baseUrl = 'http://localhost:3001/api/baskets'
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

// create a basket (CREATE)

// clear all requests for a basketb (UPDATE by clearing)


export default {
  getBasketRequests,

}
