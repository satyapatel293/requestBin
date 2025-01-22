import requestBody from "./models/basket";
import { Body } from "../types";

async function findBodies(basketName: string) {
 return await requestBody
    .find<Body>({ basket_id: basketName })
    .then((request) => {
      return request;
    })
    .catch((error) => {
      if (error instanceof Error) {
        throw new Error("Error seeding data:");
      } else {
        throw new Error("some error");
      }
    });
}


async function deleteBodies(basketName: string) {
  return await requestBody.deleteMany({ basket_id: basketName})
  .then(request => {
    return request;
  }).catch((error) => {
    if (error instanceof Error) {
      console.log("Error seeding data:", error.message);
    } else {
      console.log("some error");
    }
  });
 }

 async function addBody(requestId:string, basketName:string, body:string) {
  const newRequest = new requestBody({
    request_id: requestId,
    basket_id: basketName,
    body: body
  });

  await newRequest.save();
 }
 






export default {
  findBodies,
  deleteBodies,
  addBody,
};
