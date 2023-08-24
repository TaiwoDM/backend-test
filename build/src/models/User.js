"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const server_1 = require("src/server");
class User extends sequelize_1.Model {
}
User.init({
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    fullName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: server_1.sequelize,
    modelName: "User",
});
User.sync().then(() => {
    console.log(User === server_1.sequelize.models.User);
    console.log("User Model synced");
});
exports.default = User;
//# sourceMappingURL=User.js.map