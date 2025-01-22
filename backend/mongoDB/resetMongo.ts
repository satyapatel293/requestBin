import requestBody from "./models/basket";

// make a request_basket database in your local mongo
// to reseed mongoDB please run 
// npx ts-node [..path to this file] 
// example: npx ts-node mongoDB/resetMongo.ts 

requestBody
  .deleteMany({})
  .then(() => {
    console.log("Deleted existing documents in Request collection");

   // Seed new data
    const seedData = [
      {
        request_id: "1234567890",
        basket_id: "BASKET001",
        body: `{ "item": "item1", "quantity": 10 }`,
      },
      {
        request_id: "1234567891",
        basket_id: "BASKET001",
        body: `{ "item": "item2", "quantity": 20 }`,
      },
      {
        request_id: "1234567892",
        basket_id: "BASKET002",
        body: `{ "item": "item3", "quantity": 30 }`,
      },
      {
        request_id: "1234567893",
        basket_id: "BASKET002",
        body: `{ "item": "item3", "quantity": 30 }`,
      },
      {
        request_id: "1234567894",
        basket_id: "BASKET002",
        body: `{ "item": "item3", "quantity": 30 }`,
      },
      {
        request_id: "1234567895",
        basket_id: "BASKET001",
        body: `{ "item": "item3", "quantity": 30 }`,
      },
    ];

    //Insert the new seed data
    requestBody
      .insertMany(seedData)
      .then(() => {
        console.log("Seeded new data into the Request collection");
        // mongoose.connection.close();  // Close the connection after seeding
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log("Error seeding data:", error.message);
        } else {
          console.log("some error");
        }
      });
  })
  .catch(()=> {
      console.log("Error deleting existing data:");
  });