import { useState, useEffect } from "react";
import { Request, Styles } from "../types";
import services from "../services/basketService";
import Header from "./Header";
import RequestItem from "./RequestItem";
import copyBtn from "../assets/copy icon.png";

interface BasketPageProps {
  id: string | null | undefined;
}


function BasketPage({ id }: BasketPageProps) {
  const [requests, setRequests] = useState<Request[]>([]);
  // grab all basket data for the given basket
  // useEffect

  useEffect(() => {
    if (typeof id === "string") {
      services
        .getBasketRequests(id)
        .then((data) => setRequests(data))
        .catch((error) => console.error(error.message));
    }
  }, []);

  const borderStyle = {
    // backgroundColor: "#D7A1FF",
    backgroundColor: ' #487AC7',
    borderRadius: 15,
    border: '5px dashed #C9FFA1',
    width: '800px',
    margin: '0 auto',
    paddingLeft: '10px',
    paddingRight: '10px',
  }

  // const borderStyle = {
  //   backgroundColor: "#D7A1FF",
  //   borderRadius: 15,
  //   border: '5px dashed #C9FFA1',
  //   width: '800px',
  //   margin: '0 auto',
  //   paddingLeft: '10px',
  //   paddingRight: '10px',
  // }

  // Color Palette (Tetradic):
  // D7A1FF - light purple
  // FFA841 - peach
  // C9FFA1 - light lime green
  // A1F8FF - light sky blue

  // Chelsea
  // #487AC7 warm blue
  // #5448C7 dark blue
  // #48BAC7 turqoise

  //  hot pink #E636D6
  //  #E6367E yuck lips

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


  const copyPath = "http://localhost:3000/basket/" + String(id);
  return (
    <div style={{margin: '0 auto'}}>
      <Header pageTitle={id as string} />
      <p>
        Requests are collected at: whateverThisIs.com/basket/{id}
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

/* RETURN DATA
Array(3) [ {…}, {…}, {…} ]
​
0: Object { id: "1234567890", basket_id: "BASKET001", path: "BASKET001/Bearer/token1", … }
​
1: Object { id: "1234567891", basket_id: "BASKET001", path: "BASKET001/Bearer/token2", … }
​
2: Object { id: "1234567895", basket_id: "BASKET001", path: "BASKET001/Bearer/token6", … }
​
length: 3
​
<prototype>: Array []
*/
