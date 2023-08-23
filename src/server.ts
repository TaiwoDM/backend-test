import { Sequelize } from "sequelize";

import app from "src/index";

// connect to db
const start = async () => {
  if (
    !process.env.POSTGRES_DB ||
    !process.env.POSTGRES_HOST ||
    !process.env.POSTGRES_PORT ||
    !process.env.POSTGRES_USER ||
    !process.env.POSTGRES_PASSWORD
  ) {
    throw new Error("All PostgresDB env variables must be defined");
  }

  const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD
  );

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  app.listen(8000, () => {
    console.log("Server has started running on port 8000");
  });
};

start();
