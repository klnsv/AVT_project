import express from 'express';
//import sequelize from "./config/connection.js";
import permanents from './models/permanent.js';
import employees from './models/employee.js';
import shift from './models/shift.js';

const port = 3000;
const app = express();
app.use(express.json());

// await permanents.create(
//     {
//         MachName: "Mach A",
//         OperatorID: 1,
//         Shift: 5,
//         Date: "2024-10-01 00:00:00",
//         MachStatus:"Active",
//         Count:0,
//         OperationType:"Cutting",
//         StartTime:"16:15:00",
//         EndTime:"18:15:00"
//     }
// );

// await employees.create(
//     {
//         employee_name: "Satoshi Nakamoto",
//         rfid:"RFID007",
//         password:"$BTC"
//     }
// );

await shift.create(
    {
        start_time: "09:00:00",
        end_time: "17:00:00",
        target: 30,
        operation_type:"Cutting",
        mach_id: "Mach A",
        shift_duration: 8,
        shift_date: "2024-10-12",
        employee_id: 2
    }
);

console.log('shift entry created');
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
