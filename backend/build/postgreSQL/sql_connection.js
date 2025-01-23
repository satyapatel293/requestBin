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
exports.connectDB = exports.pool = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: 'localhost',
    port: 5432,
    user: 'basketagent',
    database: 'requestbasketdb',
    password: 'whatever',
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});
exports.pool = pool;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.query('SELECT 1');
        console.log('Connected to PostgreSQL');
    }
    catch (err) {
        if (err instanceof Error) {
            console.log('Error connecting to PostgreSQL', err);
        }
        else {
            console.log('Error');
        }
    }
});
exports.connectDB = connectDB;
