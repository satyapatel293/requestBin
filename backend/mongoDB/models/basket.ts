import mongoose from "mongoose";
mongoose.set("strictQuery", false);

console.log("connecting to", "mongodb://localhost:27017/request_basket");

mongoose
  .connect("mongodb://localhost:27017/request_basket")
  .then((_result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    if (error instanceof Error) {
      console.log("error connecting to MongoDB:", error.message);
    }
  });

const requestSchema = new mongoose.Schema({
  request_id: String,
  basket_id: String,
  body: String,
});

// TODO need to add type to this returnedObject create interface for which contains above lines
// requestSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

const requestBody = mongoose.model("Request", requestSchema);

// requestBody
//   .deleteMany({})
//   .then(() => {
//     console.log("Deleted existing documents in Request collection");

//     // Seed new data
//     const seedData = [
//       {
//         request_id: "1234567890",
//         basket_id: "BASKET001",
//         body: `{ item: "item1", quantity: 10 }`,
//       },
//       {
//         request_id: "1234567891",
//         basket_id: "BASKET001",
//         body: `{ item: "item2", quantity: 20 }`,
//       },
//       {
//         request_id: "1234567892",
//         basket_id: "BASKET002",
//         body: `{ item: "item3", quantity: 30 }`,
//       },
//       {
//         request_id: "1234567893",
//         basket_id: "BASKET002",
//         body: `{ item: "item3", quantity: 30 }`,
//       },
//       {
//         request_id: "1234567894",
//         basket_id: "BASKET002",
//         body: `{ item: "item3", quantity: 30 }`,
//       },
//       {
//         request_id: "1234567895",
//         basket_id: "BASKET001",
//         body: `{ item: "item3", quantity: 30 }`,
//       },
//     ];

//     // Insert the new seed data
//     requestBody
//       .insertMany(seedData)
//       .then(() => {
//         console.log("Seeded new data into the Request collection");
//         // mongoose.connection.close();  // Close the connection after seeding
//       })
//       .catch((error) => {
//         if (error instanceof Error) {
//           console.log("Error seeding data:", error.message);
//         } else {
//           console.log("some error");
//         }
//       });
//   })
//   .catch((error) => {
//     if (error instanceof Error) {
//       console.log("Error deleting existing data:", error.message);
//     }
//   });

export default requestBody;













// index files 

// app.get('/:basket_id', (_req, res) => {
//   const id = _req.params.basket_id;
//   requestBody.find({ basket_id: id})
//   .then(request => {
//     res.json(request);
//   }).catch((error) => {
//     if (error instanceof Error) {
//       console.log("Error seeding data:", error.message);
//     } else {
//       console.log("some error");
//     }
//   });
// });

// app.get('/', (_req, res) => {
//   requestBody.find({})
//   .then(request => {
//     res.send(request);
//   }).catch((error) => {
//     if (error instanceof Error) {
//       console.log("Error seeding data:", error.message);
//     } else {
//       console.log("some error");
//     }
//   });
// });

// app.get('/delete/:basket_id', (_req, res) => {
//   const id = _req.params.basket_id;
//   requestBody.deleteMany({ basket_id: id})
//   .then(request => {
//     res.json(request);
//   }).catch((error) => {
//     if (error instanceof Error) {
//       console.log("Error seeding data:", error.message);
//     } else {
//       console.log("some error");
//     }
//   });
// });