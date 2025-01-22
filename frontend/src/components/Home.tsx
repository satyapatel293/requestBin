import { useState, useEffect } from 'react';
import Header from "./Header";
import services from '../services/basketService'
import { useNavigate, Link } from "react-router-dom";
import { Basket } from '../types';


function Home () {
  const [baskets, setBaskets] = useState<Basket[]>([]);

  useEffect(() => {
    services.getAllBaskets()
      .then(response => {
        console.log('Rejoice! Baskets are set');
        setBaskets(response)
  });
  }, []);

  const navigate = useNavigate();

  const createBasketButtonHandler = async () => {
    // alert('You clicked the button!');
    try {
      const response = await services.createBasket();
      const id = response.basket_url;
      navigate(`${id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error('Something went wrong');
      }
    }
  };

  // const deleteBasket = async () => {
  //   const response = await services.deleteBasket('1234567890');
  //   console.log('check with the next button');
  // };

  // const getBasket = async () => {
  //   const response = await services.getBasketRequests("BASKET001");
  //   console.log(response);
  // }

  // const getAll = async () => {
  //   const response = await services.getAllBaskets()
  //   console.log(response);
  // }
  
  const headerStyle = {
    backgroundColor: "#FFF4E1",
    margin: 0,
  }

  const basketListStyle = {
    backgroundColor: '#487AC7',
    width: '50%',
    margin: '0 auto',
    border: '2px solid black',
    borderRadius: '8px',
    marginTop: '20px'
  }

  const baseUrl = 'http://localhost:5173/web/'
  return (
    <>
      <div style={headerStyle}>
        <Header pageTitle='Basket Case'/>
      </div>
      <p>Create a new basket that will collect and inspect Requests</p>
      <button className="createBtn" onClick={createBasketButtonHandler}>Create new Basket</button>
      <div style={basketListStyle}>
        <ul>
        {baskets.map(({basket_name}) => {
          return (
            <li key={basket_name} style={{listStyle: 'none'}}>
              <Link  to={baseUrl + basket_name}>{basket_name}</Link>
            </li>
          )
        })}
        </ul>
      </div>
    </>
  )
}

export default Home;