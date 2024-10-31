import { DataTypes } from "sequelize";
import sequelize from "../config/connection.js";

const employees = sequelize.define('employees',{
    employee_id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    employee_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rfid:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    total_idle_hours:{
        type:DataTypes.FLOAT,
        allowNull:true,
        defaultValue:0
    },
    // total_shift_hours:{
    //     type:DataTypes.FLOAT,
    //     allowNull:false,
    //     defaultValue:0
    // },
    total_working_hours:{
        type:DataTypes.FLOAT,
        allowNull:false,
        defaultValue:0
    },
    total_count:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    total_efficiency:{
        type:DataTypes.FLOAT,
        allowNull:false,
        defaultValue:0
    },
    assigned_shift:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    },
    total_targets_met:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    }
},{
    timestamps:false,
    tableName:'employees'
});

export default employees;