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

export default sequelize;

// import { Sequelize } from "sequelize";
// import * as dotenv from "dotenv";
// dotenv.config();

// class Database {
//   public sequelize: Sequelize | undefined;

//   private POSTGRES_DB = process.env.POSTGRES_DB as string;
//   private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
//   private POSTGRES_PORT = process.env.POSTGRES_PORT as unknown as number;
//   private POSTGRES_USER = process.env.POSTGRES_USER as unknown as string;
//   private POSTGRES_PASSWORD = process.env
//     .POSTGRES_PASSWORD as unknown as string;

//   constructor() {
//     this.connectToPostgreSQL();
//   }

//   private async connectToPostgreSQL() {
//     this.sequelize = new Sequelize(
//       this.POSTGRES_DB,
//       this.POSTGRES_USER,
//       this.POSTGRES_PASSWORD,
//       {
//         host: this.POSTGRES_HOST,
//         dialect: "postgres",
//       }
//     );

//     await this.sequelize
//       .authenticate()
//       .then(() => {
//         console.log(
//           "✅ PostgreSQL Connection has been established successfully."
//         );
//       })
//       .catch((err) => {
//         console.error("❌ Unable to connect to the PostgreSQL database:", err);
//       });
//   }
// }

// export default Database;
