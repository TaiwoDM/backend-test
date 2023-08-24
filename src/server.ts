// import { Sequelize } from "sequelize";
import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

import sequelize from "config/database";

import app from "src/index";

const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDBConnection();

app.listen(5000, () => {
  console.log("Server has started running on port 5000");
});
