import { DataTypes, Model } from "sequelize";

import sequelize from "src/config/database";


interface IUser {
  email: string;
  fullName: string;
  password: string | undefined;
}

class User extends Model { }

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },

    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
  {
    sequelize: sequelize,
    modelName: "User",
    tableName: "users"
  }
);


export { User as default, IUser };