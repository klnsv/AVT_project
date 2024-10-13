// This file contains all the controllers concerning the shift ie adding shift, deleting shift, updating shift, reading all the shifts etc
import shift from "../models/shift.js";
import employees from "../models/employee.js";

const addShift = async (req,res)=>{
    try{
        const {start_time,end_time,target,operation_type,mach_id,shift_duration,shift_date,employee_id} = req.body;
        const existing_shift = await shift.findOne(
            {
                where:{
                    shift_date:shift_date,
                    employee_id:employee_id
                }
            }
        );
        if(existing_shift){
            return res.status(200).json({msg:`Shift on ${shift_date} for the given employee_id ${employee_id} has already been created! The shift_id is ${existing_shift.shift_id}`});
        }
        if(!existing_shift){
            const created_shift = await shift.create(
                {
                    start_time: start_time,
                    end_time: end_time,
                    target: target,
                    operation_type:operation_type,
                    mach_id: mach_id,
                    shift_duration: shift_duration,
                    shift_date: shift_date,
                    employee_id: employee_id
                }
            );
            res.status(200).json({msg:`Shift has been created successfully`,shift_id:created_shift.shift_id,shift_date:created_shift.shift_date});
        }
    }
    catch(err){
        res.status(500).json({msg: err.message});
    }
}

const deleteShift = async (req,res)=>{
    try{
        const {shift_id} = req.body;
        const today = new Date();
        const to_destroy_shift = await shift.findOne(
            {
                where:{
                    shift_id:shift_id
                }
            }
        );

        if(to_destroy_shift.start_time >= today.getTime()){
            return res.status(200).json({msg:`Sorry cannot delete the shift after it has begun! The shift_id is ${to_destroy_shift.shift_id}`});
        }
        else{
            to_destroy_shift.destroy();
            const employees_list = await employees.findAll({
                where:{
                    assigned_shift: shift_id
                }
            });
            employees_list.map(async employee =>{
                await employee.update({assigned_shift:null});
                await employee.save();
            });
            return res.status(200).json({msg:"The selected shift has been deleted!"});
        }

    }catch(err){
        res.status(500).json({msg:err.message});
    }
}

const updateShift = async (req,res)=>{
    try{
        const {
            shift_id = null,
            start_time = null,
            end_time = null,
            target = null,
            operation_type = null,
            mach_id = null,
            shift_duration = null,
            shift_date = null,
            employee_id = null
        } = req.body;
    
        const selected_shift = await shift.findOne({
            where:{
                shift_id:shift_id
            }
        });

        if(!selected_shift){
            return res.status(404).json({msg:`The shift with the given shift_id ${shift_id} cannot be found!!`});
        }
    
        await selected_shift.update({
            shift_id:shift_id,
            start_time:start_time,
            end_time:end_time,
            target:target,
            operation_type:operation_type,
            mach_id:mach_id,
            shift_duration:shift_duration,
            shift_date:shift_date,
            employee_id:employee_id
        });
        return res.status(200).json({msg:`The shift with the shift_id ${shift_id} has been updated!!`});
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
    
}

const getShiftDetails = async(req,res) =>{
    try{
        const {shift_id} = req.body;
        const selected_shift = await shift.findOne({
            where:{
                shift_id:shift_id
            }
        });
        if(!selected_shift){
            return res.status(404).json({msg:`The shift with the given shift_id ${shift_id} cannot be found!!`});
        }
        return res.status(200).json({msg: selected_shift});
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}
export {addShift,deleteShift,updateShift,getShiftDetails};