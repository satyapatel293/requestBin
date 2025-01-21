import { useState, useEffect } from "react";
import { Request } from "../types";
import services from "../services/basketService";
import Header from "./Header";
import RequestItem from "./RequestItem";

interface BasketPageProps {
  id: string | null | undefined;
}

const testRequests: Request[] = [
  // {
  //   time: Date.now(),
  //   path: "/asdflsdf/",
  //   requestMethod: "POST",
  //   headers: { "Content-Type": "text/html" },
  //   body: "<p>Hello</p>",
  // },
  // {
  //   time: Date.now(),
  //   path: "/boxcare/",
  //   requestMethod: "DELETE",
  //   headers: { "Content-Type": "text/html" },
  //   body: "<p>Goodbye</p>",
  // },
  // {
  //   time: Date.now(),
  //   path: "/bopploop/",
  //   requestMethod: "GET",
  //   headers: { "Content-Type": "text/html" },
  //   body: "<p>Oops</p>",
  // },
];

function BasketPage({ id }: BasketPageProps) {
  const [requests, setRequests] = useState<Request[]>(testRequests);
  // grab all basket data for the given basket
  // useEffect

  useEffect(() => {
    if (typeof id === "string") {
      services
        .getBasketRequests(id)
        .then((data) => {
          console.log(data);
          setRequests(data);
        })
        .catch((error) => console.error(error.message));
    }
  }, []);

  const borderStyle = {
    backgroundColor: "#D7A1FF",
    borderRadius: 15,
    border: '5px dashed #C9FFA1',
    width: '800px',
    margin: '0 auto',
    paddingLeft: '10px',
    paddingRight: '10px'
  }

  // Color Palette (Tetradic):
  // D7A1FF - light purple
  // FFA841 - peach
  // C9FFA1 - light lime green
  // A1F8FF - light sky blue

  return (
    <div style={{margin: '0 auto'}}>
      <Header pageTitle={`Basket: ${id}`} />
      <p>Requests are collected at: whateverThisIs.com/basket/{id}</p>
      <div style={borderStyle}>
      {requests.map((request: Request) => {
        console.log(request['id']);
        return <RequestItem key={request.id} request={request} />;
      })}
      </div>
      This is BasketPage {id}
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
