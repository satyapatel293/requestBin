import { useState, useEffect } from 'react';
import { Request } from '../types';
import services from '../services/basketService';
import Header from './Header';

interface BasketPageProps {
  id: string | null | undefined;
}



const testRequests: Request[] = [
  { time: Date.now(),
    path: '/asdflsdf/',
    requestMethod: 'POST',
    headers: {'Content-Type': 'text/html'},
    body: '<p>Hello</p>',
   },
   { time: Date.now(),
    path: '/boxcare/',
    requestMethod: 'DELETE',
    headers: {'Content-Type': 'text/html'},
    body: '<p>Goodbye</p>',
   },
   { time: Date.now(),
    path: '/bopploop/',
    requestMethod: 'GET',
    headers: {'Content-Type': 'text/html'},
    body: '<p>Oops</p>',
   }
]

function BasketPage({ id }: BasketPageProps) {
  const [requests, setRequests] = useState<Request[]>(testRequests)
  // grab all basket data for the given basket
      // useEffect

  useEffect(() => {
    services.getBasketRequests(id)
         .then(data => setRequests(data))
         .catch(error => console.error(error.message));
  }, []);

  return (
    <div>
      <Header pageTitle={`Basket: ${id}`} />
      {requests.map((request: Request, idx: number) => {
        return <p key={request.path + String(idx)}>{request.path}</p>
      })}
      This is BasketPage {id}
    </div>
  )
}

export default BasketPage;