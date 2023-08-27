import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

// connect to db
if (
  !process.env.POSTGRES_DB ||
  !process.env.POSTGRES_PORT ||
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_PASSWORD || !process.env.APP_ENV
) {
  throw Error("All PostgresDB env variables must be defined");
}
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST || "localhost",
    dialect: "postgres",
    logging: process.env.APP_ENV == "test" ? false : true
  }
);

export default sequelize;