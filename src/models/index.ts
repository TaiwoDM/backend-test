import sequelize from "src/config/database";

import User from "./User";
import Folder from "./Folder";
import File from "./File";

User.hasMany(File, { as: "files", foreignKey: "email" });
User.hasMany(Folder, { as: "folders", foreignKey: "email" });
Folder.hasMany(File, { as: "files", foreignKey: "folderId" });
File.belongsTo(User);
File.belongsTo(Folder);
Folder.belongsTo(User);

const syncTabless = async () => {
  try {
    await User.sync();
  } catch (err) {
    console.log("User Model could not synced");
  }
  try {
    await Folder.sync();
  } catch (err) {
    console.log("Folder Model could not synced");
  }
  try {
    await File.sync();
  } catch (err) {
    console.log("File Model could not synced");
  }
};

syncTabless();

export { User, File, Folder };
