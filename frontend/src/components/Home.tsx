import { useState, useEffect } from 'react';
import Header from "./Header";
import services from '../services/basketService'
import { useNavigate } from "react-router-dom";
import { Basket } from '../types';


function Home () {
  const [baskets, setBaskets] = useState<Basket[]>([]);

  useEffect(() => {
    services.getAllBaskets()
      .then(response => setBaskets(response));
  }, []);

  const navigate = useNavigate();

  const createBasketButtonHandler = async () => {
    // alert('You clicked the button!');
    try {
      const id = await services.createBasket();
      navigate(`/web/${id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('Something went wrong');
      }
    }
  };

  const deleteBasket = async () => {
    const response = await services.deleteBasket('1234567890');
    console.log('check with the next button');
  };

  const getBasket = async () => {
    const response = await services.getBasketRequests("BASKET001");
    console.log(response);
  }

  const getAll = async () => {
    const response = await services.getAllBaskets()
    console.log(response);
  }
  
  return (
    <>
      <Header pageTitle='Basket Case'/>
      <p>Create a new basket that will collect and inspect Requests</p>
      <button onClick={createBasketButtonHandler}>Create new Basket</button>
      <button onClick={deleteBasket}>Delete</button>
      <button onClick={getBasket}>Get Basket's Requests</button> pass it value number(1234567890)
      <button onClick={getAll}>Get All</button>

      {baskets.map(({basket_name}) => {
        return <p key={basket_name}>{basket_name}</p>
      })}
      {/* make this map into clickable items that navigate to basket's requests page */}
    </>
  )
}

export default Home;