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

  const renderBaskets = () => {
    if (baskets.length === 0) {
      return <p>There are currently no baskets.</p>
    } else {
      return (
        <ul>
          {baskets.map(({basket_name}) => {
            return (
              <li key={basket_name} style={{listStyle: 'none'}}>
                <Link  to={baseUrl + basket_name}>{basket_name}</Link>
              </li>
            )
          })}
        </ul>
      );
    }
  }

  const baseUrl = import.meta.env.VITE_BASE_WEB;
  
  return (
    <>
      <div style={headerStyle}>
        <Header pageTitle='Basket Case'/>
      </div>
      <p>Create a new basket that will collect and inspect Requests</p>
      <button className="createBtn" onClick={createBasketButtonHandler}>Create new Basket</button>
      <div style={basketListStyle}>
        {renderBaskets()}
      </div>
    </>
  )
}

export default Home