import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

mongoose.set("strictQuery", false);

console.log("connecting to", process.env.MONGO_URL);

mongoose
  .connect(process.env.MONGO_URL as string)
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