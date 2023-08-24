import { DataTypes } from "sequelize";

import { sq } from "./../server";

const User = sq.define("user", {
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
});

User.sync().then(() => {
  console.log("User Model synced");
});

export default User;
