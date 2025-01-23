"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", false);
console.log("connecting to", "mongodb://localhost:27017/request_basket");
mongoose_1.default
    .connect("mongodb://localhost:27017/request_basket")
    .then((_result) => {
    console.log("connected to MongoDB");
})
    .catch((error) => {
    if (error instanceof Error) {
        console.log("error connecting to MongoDB:", error.message);
    }
});
const requestSchema = new mongoose_1.default.Schema({
    request_id: String,
    basket_id: String,
    body: String,
});
const requestBody = mongoose_1.default.model("Request", requestSchema);
requestSchema.set('toJSON', {
    transform: (_, returnedObject) => {
        var _a;
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        returnedObject.id = (_a = returnedObject._id) === null || _a === void 0 ? void 0 : _a.toString(); // Handle `_id` properly
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = requestBody;
