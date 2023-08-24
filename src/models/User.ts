import { DataTypes, Model } from "sequelize";

import sequelize from "config/database";

// const dbInstance = db.sequelize;

interface IUser {
  email?: string;
  fullName?: string;
  password?: string;
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
    },
  },
  {
    sequelize: sequelize,
    modelName: "User",
  }
);

User.sync().then(() => {
  console.log(User === sequelize.models.User);
  console.log("User Model synced");
});

export { User as default, IUser };
