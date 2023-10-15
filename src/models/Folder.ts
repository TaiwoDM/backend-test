import { DataTypes, Model } from "sequelize";

import sequelize from "src/config/database";

class Folder extends Model {}

Folder.init(
  {
    folderId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    dirName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Folder",
    tableName: "folders",
  }
);

export { Folder as default };
