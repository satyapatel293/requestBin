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
const express_1 = __importDefault(require("express"));
const sql_connection_1 = require("../postgreSQL/sql_connection");
const queries_1 = require("../postgreSQL/queries");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
/* eslint-disable @typescript-eslint/no-unsafe-call */
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, sql_connection_1.connectDB)().then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    if (err instanceof Error) {
        throw new Error('Error connecting to postgreSQL');
    }
    else {
        throw new Error('Error');
    }
});
const PORT = 3000;
app.get('/api/baskets', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield (0, queries_1.getAllBaskets)();
        res.json(results);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('An error occurred fetching all the baskets');
    }
}));
app.get('/api/baskets/:id', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield (0, queries_1.getSingleBasketRequests)(_req.params.id);
        res.json(results);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('An error occurred fetching a single basket');
    }
}));
app.delete('/api/baskets/:id', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield (0, queries_1.deleteBasket)(_req.params.id);
        console.log(results);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('An error occurred deleting a basket with requests');
    }
}));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
