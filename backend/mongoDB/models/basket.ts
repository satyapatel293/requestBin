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


const requestBody = mongoose.model("Request", requestSchema);

export default requestBody;





// TODO need to add type to this returnedObject create interface for which contains above lines
// requestSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });