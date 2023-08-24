import app from "src/index";
import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

// connect to db
if (
  !process.env.POSTGRES_DB ||
  !process.env.POSTGRES_HOST ||
  !process.env.POSTGRES_PORT ||
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_PASSWORD
) {
  throw Error("All PostgresDB env variables must be defined");
}

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  }
);

const start = async () => {
  app.listen(5000, () => {
    console.log("Server has started running on port 8000");
  });

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();

export { sequelize as sq };
