import sequelize from "src/config/database";

import User from "./User";
import Folder from "./Folder";
import File from "./File";

User.hasMany(File, { as: "files", foreignKey: "email" });
User.hasMany(Folder, { as: "folders", foreignKey: "email" });
Folder.hasMany(File, { as: "files", foreignKey: "folderId" })
File.belongsTo(User);
File.belongsTo(Folder);
Folder.belongsTo(User);

User.sync().then(() => {
    // console.log(User === sequelize.models.User);
    // console.log("User Model synced");
});

Folder.sync().then(() => {
});

File.sync().then(() => {
});

export { User, File, Folder }