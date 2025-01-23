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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBasket = exports.getSingleBasketRequests = exports.getAllBaskets = void 0;
const sql_connection_1 = require("./sql_connection");
const getAllBaskets = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sql_connection_1.client.query('SELECT * FROM baskets');
        return result.rows;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`There was an error fetching the baskets from the database ${err}`);
        }
        else {
            throw new Error('Error');
        }
    }
});
exports.getAllBaskets = getAllBaskets;
const getSingleBasketRequests = (basket_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sql_connection_1.client.query(`SELECT * FROM requests WHERE basket_id = '${basket_id}'`);
        return result.rows;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`There was an error fetching the baskets from the database ${err}`);
        }
        else {
            throw new Error('Error');
        }
    }
});
exports.getSingleBasketRequests = getSingleBasketRequests;
const deleteBasket = (basket_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sql_connection_1.client.query(`DELETE FROM requests WHERE basket_id = '${basket_id}'`);
        const result2 = yield sql_connection_1.client.query(`DELETE FROM baskets WHERE basket_name = '${basket_id}'`);
        return `${result.rowCount}, ${result2.rowCount} rows were deleted`;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`There was an error fetching the baskets from the database ${err}`);
        }
        else {
            throw new Error('Error');
        }
    }
});
exports.deleteBasket = deleteBasket;
