import { Client } from 'pg';

const client = new Client ({
    host: 'localhost',
    port: 5432,
    user: 'basketagent',
    database: 'requestbasketdb'
});

const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL');
    } catch (err) {
      if (err instanceof Error) {
        console.log('Error connecting to PostgreSQL', err);
      } else {
        console.log('Error');
      }
    }
};

export { client, connectDB };