import { DataTypes, Model } from "sequelize";

import sequelize from "src/config/database";

class File extends Model { }

File.init(
    {

        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        file: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize: sequelize,
        modelName: "File",
        tableName: "files",
    }
);

export { File as default };
