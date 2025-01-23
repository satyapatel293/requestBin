import { useState, useEffect } from "react";
import { Request, Styles, BasketPageProps } from "../types";
import services from "../services/basketService";
import Header from "./Header";
import RequestItem from "./RequestItem";
import copyBtn from "../assets/copy icon.png";

function BasketPage({ id }: BasketPageProps) {
  const [requests, setRequests] = useState<Request[]>([]);  

  useEffect(() => {
    if (typeof id === "string") {
      services
        .getBasketRequests(id)
        .then((data) => setRequests(data))
        .catch((error) => console.error(error.message));
    }
  }, []);

  const borderStyle = {
    backgroundColor: ' #487AC7',
    borderRadius: 15,
    border: '5px dashed #C9FFA1',
    width: '800px',
    margin: '0 auto',
    paddingLeft: '10px',
    paddingRight: '10px',
  }

  const buttonStyle: Styles = {
    backgroundColor: 'lightgray',
    width: '10px',
    height: '30px',
    position: 'relative',
    marginLeft: '10px',
  }

  const imageStyle: Styles = {
    position: 'absolute',
    top: 1,
    left: 5,
  }
  
  const renderRequests = (requestData: Request[]) => {
    if (requestData.length === 0) {
      return <p>There are currently no requests for this Basket</p>
    } else {
      return requestData.map((request: Request) => {
        return <RequestItem key={request.id} request={request} />;
      });
    }
  }


  const copyPath = import.meta.env.VITE_BASKET_COLLECTION + String(id);
  return (
    <div style={{margin: '0 auto'}}>
      <Header pageTitle={id as string} />
      <p>
        Requests are collected at: https://satyapatel.xyz/basket/{id}
        <button
            style={buttonStyle}
            onClick={() => navigator.clipboard.writeText(copyPath)}
            >
            <img style={imageStyle} src={copyBtn} alt="copy button" width="30" ></img>
          </button>
      </p>
      <div style={borderStyle}>
        {renderRequests(requests)}
      </div>
    </div>
  );
}

export default BasketPage;