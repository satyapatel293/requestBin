import Header from "./Header";
import services from '../services/basketService'
import { useNavigate } from "react-router-dom";


function Home () {
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
  }

  return (
    <>
    <Header pageTitle='New Basket'/>
    <p>Create a new basket that will collect and inspect Requests</p>
    <button onClick={createBasketButtonHandler}>Create new Basket</button>
    </>
  )
}

export default Home;