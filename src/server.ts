// import { Sequelize } from "sequelize";
import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
dotenv.config();

import sequelize from "src/config/database";

import app from "src/index";

if (
  !process.env.JWT_SECRET ||
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_REGION ||
  !process.env.AWS_API_VERSION ||
  !process.env.SERVER_PORT
) {
  throw Error("All env variables must be defined");
}

const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDBConnection();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server has started running on ${process.env.SERVER_PORT}`);
});
