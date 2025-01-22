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



requestSchema.set('toJSON', {
  transform: (_, returnedObject: { _id?: mongoose.Schema.Types.ObjectId; __v?: number; id?: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    returnedObject.id = returnedObject._id?.toString(); // Handle `_id` properly
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export default requestBody;