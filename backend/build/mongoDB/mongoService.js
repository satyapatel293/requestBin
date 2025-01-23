"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basket_1 = __importDefault(require("./models/basket"));
function findBodies(basketName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield basket_1.default
            .find({ basket_id: basketName })
            .then((request) => {
            return request;
        })
            .catch((error) => {
            if (error instanceof Error) {
                throw new Error("Error seeding data:");
            }
            else {
                throw new Error("some error");
            }
        });
    });
}
function deleteBodies(basketName) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield basket_1.default.deleteMany({ basket_id: basketName })
            .then(request => {
            return request;
        }).catch((error) => {
            if (error instanceof Error) {
                console.log("Error seeding data:", error.message);
            }
            else {
                console.log("some error");
            }
        });
    });
}
function addBody(requestId, basketName, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const newRequest = new basket_1.default({
            request_id: requestId,
            basket_id: basketName,
            body: body
        });
        yield newRequest.save();
    });
}
exports.default = {
    findBodies,
    deleteBodies,
    addBody,
};
