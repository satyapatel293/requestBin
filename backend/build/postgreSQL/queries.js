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
const sql_connection_1 = require("./sql_connection");
const uuid_1 = require("uuid");
const getAllBaskets = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sql_connection_1.pool.query("SELECT basket_name FROM baskets");
        return result.rows;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`There was an error fetching the baskets from the database ${err.message}`);
        }
        else {
            throw new Error("Error");
        }
    }
});
const getBasketRequests = (basket_name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sql_connection_1.pool.query(`SELECT * FROM requests WHERE basket_id = $1`, [basket_name]);
        return result.rows;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`There was an error fetching the baskets from the database ${err}`);
        }
        else {
            throw new Error("Error");
        }
    }
});
const deleteBasket = (basket_name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sql_connection_1.pool.query(`DELETE FROM baskets WHERE basket_name = $1`, [basket_name]);
        return `${result.rowCount} basket was deleted`;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`There was an error deleting the baskets from the database ${err.message}`);
        }
        else {
            throw new Error("Error");
        }
    }
});
const deleteRequests = (basket_name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sql_connection_1.pool.query(`DELETE FROM requests WHERE basket_id = $1`, [basket_name]);
        return `${result.rowCount} requests were deleted`;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`There was an error deleting requests from the database ${err.message}`);
        }
        else {
            throw new Error("Error");
        }
    }
});
const addNewBasket = (basket_name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sql_connection_1.pool.query(`INSERT INTO baskets VALUES ($1)`, [basket_name]);
        return {
            basket_name: `/basket/${basket_name}`,
            basket_url: `/web/${basket_name}`
        };
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`There was an error fetching the baskets from the database ${err}`);
        }
        else {
            throw new Error("Error");
        }
    }
});
const addRequest = (requestObj) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sql_connection_1.pool.query(`INSERT INTO requests (id, basket_id, path, method, headers, query_params)
      VALUES ($1, $2, $3, $4, $5, $6)`, [
            requestObj.id,
            requestObj.basket_id,
            requestObj.path,
            requestObj.method,
            requestObj.headers,
            requestObj.query_params
        ]);
        console.log(`A new request was create with basketname: ${requestObj.basket_id} and id: ${requestObj.id}`);
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`There was an error adding a new request the baskets from the database ${err.message}`);
        }
        else {
            throw new Error("Error");
        }
    }
    return "hey";
});
const getAllRequestIds = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sql_connection_1.pool.query("SELECT id FROM requests");
        return result.rows;
    }
    catch (err) {
        if (err instanceof Error) {
            throw new Error(`There was an error fetching the requests from the database ${err.message}`);
        }
        else {
            throw new Error("Error");
        }
    }
});
const generateId = () => {
    const uuid = (0, uuid_1.v4)();
    return uuid.slice(0, 10);
};
const existingBasket = (newBasket) => __awaiter(void 0, void 0, void 0, function* () {
    const basketIds = yield getAllBaskets();
    return basketIds.map((obj) => obj.basket_name).includes(newBasket);
});
const generateBasketId = () => __awaiter(void 0, void 0, void 0, function* () {
    let newBasket = generateId();
    while (yield existingBasket(newBasket)) {
        newBasket = generateId();
    }
    return newBasket;
});
const generateRequestId = () => __awaiter(void 0, void 0, void 0, function* () {
    let requestId = generateId();
    const ids = yield getAllRequestIds();
    while (ids.map((obj) => obj.id).includes(requestId)) {
        requestId = generateId();
    }
    return requestId;
});
exports.default = {
    getAllBaskets,
    getBasketRequests,
    deleteBasket,
    addRequest,
    addNewBasket,
    getAllRequestIds,
    generateBasketId,
    generateRequestId,
    existingBasket,
    deleteRequests
};
