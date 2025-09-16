import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [__dirname + '/../models/**/*.ts', __dirname + '/../models/**/*.js'],
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

export default db;
