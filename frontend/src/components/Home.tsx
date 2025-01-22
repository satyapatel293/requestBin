import { useState, useEffect } from 'react';
import Header from "./Header";
import services from '../services/basketService'
import { useNavigate, Link } from "react-router-dom";
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
  
  const headerStyle = {
    backgroundColor: "#FFF4E1",
    margin: 0,
  }

  const baseUrl = 'http://localhost:5173/web/'
  return (
    <>
      <div style={headerStyle}>
        <Header pageTitle='Basket Case'/>
      </div>
      <p>Create a new basket that will collect and inspect Requests</p>
      <button onClick={createBasketButtonHandler}>Create new Basket</button>
      {/* <button onClick={deleteBasket}>Delete</button>
      <button onClick={getBasket}>Get Basket's Requests</button> pass it value number(1234567890)
      <button onClick={getAll}>Get All</button> */}
      <ul>
      {baskets.map(({basket_name}) => {
        return (
          <li key={basket_name} style={{listStyle: 'none'}}>
            <Link  to={baseUrl + basket_name}>{basket_name}</Link>
          </li>
        )
      })}
      </ul>
      {/* make this map into clickable items that navigate to basket's requests page */}
    </>
  )
}

export default Home;