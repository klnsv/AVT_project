import { DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

const temporary = sequelize.define('temporary',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    permanent_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    rfid:{
        type: DataTypes.STRING,
        allowNull:false
    },
    mach_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    employee_id:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    proximity_count:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    timestamps:{
        type:DataTypes.TIME
    }
},{
    timestamps:false,
    tableName:'temporary'
});

export default temporary;