import { DataTypes, NOW } from "sequelize";
import sequelize from "../config/connection.js";
import employees from "./employee.js";

const shift = sequelize.define('shift',{
    shift_id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    start_time:{
        type:DataTypes.TIME,
        allowNull:false
    },
    end_time:{
        type:DataTypes.TIME,
        allowNull:false
    },
    target:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    operation_type:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    mach_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    shift_duration:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    shift_date:{
        type:DataTypes.DATEONLY,
        allowNull:false,
        defaultValue:NOW
    },
    employee_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: employees,
            key: employees.employee_id
        }
    }
},{
    timestamps:false,
    tableName:'shift'
});

export default shift;

