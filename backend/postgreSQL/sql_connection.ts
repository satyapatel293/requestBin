import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool ({
    host: 'localhost',
    port: 5432,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    idleTimeoutMillis: 30000, 
    connectionTimeoutMillis: 2000
});

const connectDB = async () => {
    try {
        await pool.query('SELECT 1');
        console.log('Connected to PostgreSQL');
    } catch (err) {
      if (err instanceof Error) {
        console.log('Error connecting to PostgreSQL', err);
      } else {
        console.log('Error');
      }
    }
};

export { pool, connectDB };
