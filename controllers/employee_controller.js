import employees from "../models/employee.js";
import crypto from 'crypto';
import shift from "../models/shift.js";

const salt = crypto.randomBytes(16).toString('hex');
const createEmployee = async (req,res) =>{
    try{
        const {employee_name,rfid,password} = req.body;
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha256`).toString('hex');
        const employee = await employees.create(
            {
                employee_name:employee_name,
                rfid:rfid,
                password:hash
            }
        );
        return res.status(200).json({msg: `The employee has been created with the id ${employee.employee_id}`});
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}

const editEmployee = async (req,res) =>{
    try{
        //frontend guys should check for matching between password and new_password and throw error message accordingly
        const {employee_id,employee_name,password,new_password=null} = req.body;
        const input_hashed_password = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha256`).toString('hex');
        const employee_record = await employees.findOne(
            {
                where:{
                    employee_id:employee_id
                }
            }
        );
        if(employee_record.password === input_hashed_password){
            const new_hashed_password = crypto.pbkdf2Sync(new_password, salt, 1000, 64, `sha256`).toString('hex');
            if(new_password!=null){
                await employee_record.update(
                    {
                        employee_name:employee_name,
                        password:new_hashed_password
                    }
                );
            }
            else{
                await employee_record.update(
                    {
                        employee_name:employee_name
                    }
                );
            }
            return res.status(200).json({msg:`Employee record has been changed!,Employee's id is ${employee_id} Employee's new name is ${employee_name}, Employee's new password is ${new_password}`});
        }
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}

const getEmployeeDetails = async (req,res)=>{
    try{
        const {employee_ids} = req.body; //employee_ids is an array
        const employee_details = await employees.findAll(
            {
                where:{
                    employee_id:employee_ids
                }
            }
        )
        return res.status(200).json({msg:`Details for the following ids : ${employee_ids}`,employee_details:employee_details});
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}

const deleteEmployee = async (req,res) =>{
    try{
        const {employee_id} = req.body;
        const time_now = new Date();
        const shifts = await shift.findAll(
            {
                where:{
                    shift_date:{
                        [Op.gte]:time_now
                    }
                }
            }
        );
        if(!shifts){
            const employee = await employees.findOne(
                {
                    where:
                    {
                        employee_id:employee_id
                    }
                }
            );
            if(!employee){
                return res.status(404).json({msg:`The employee with the id: ${employee_id} has not been found`});
            }
            await employee.destroy();
            await employee.save();
            return res.status(200).json({msg:`The employee with the id: ${employee_id} has been deleted!!`});
        }
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}

export {createEmployee,editEmployee,getEmployeeDetails,deleteEmployee};