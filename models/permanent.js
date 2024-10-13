import { DataTypes } from "sequelize";
import sequelize from "../config/connection.js";
//import { UPDATE } from "sequelize/lib/query-types";

const permanents = sequelize.define('permanents',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    MachName:{
        type: DataTypes.STRING,
        allowNull:false
    },
    OperatorID:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    Shift:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    Date:{
        type:DataTypes.DATE,
        allowNull:true
    },
    IdleTime:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    NonWorking:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    MachStatus:{
        type:DataTypes.STRING,
        allowNull:false
    },
    Count:{
        type:DataTypes.INTEGER,
        allowNull:true
    },
    OperationType:{
        type:DataTypes.STRING,
        allowNull:false
    },
    StartTime:{
        type:DataTypes.TIME,
        allowNull:true
    },
    EndTime:{
        type:DataTypes.TIME,
        allowNull:true
    },
    efficiency:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    createdAt:{
        type:DataTypes.TIME,
        defaultValue:DataTypes.NOW
    },
    updatedAt:{
        type:DataTypes.TIME,
        defaultValue:DataTypes.NOW,
        onUpdate:DataTypes.NOW
    }
},{
    tableName:'permanents'
});

export default permanents;