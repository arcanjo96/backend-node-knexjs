import Knex from 'knex';
import dotenv from 'dotenv';
dotenv.config();

const database = Knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: Number(process.env.DB_PORT)
    },
});

export default database;