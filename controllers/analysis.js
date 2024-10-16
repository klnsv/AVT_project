import permanent from '../models/permanent.js';
import shift from '../models/shift.js';
import { Op } from 'sequelize';
const getShift = async (req,res) =>{
    try{
        //const returnable = [];
        const {start_date,end_date} = req.body;
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        const shifts = await shift.findAll(
            {
                where:{
                    shift_date:{
                        [Op.between]:[startDate,endDate]
                    }
                }
            }
        );
        const returnable = await Promise.all(
            shifts.map(async (shift) =>{
                const permanent_entry = await permanent.findOne(
                    {
                        where:{
                            Shift:shift.shift_id
                        }
                    }
                );
                return {
                        target: shift.target,
                        permanent_entry
                    };
                
        }));
        // const permanent_entries = await permanent.findAll(
        //     {
        //         where:{
        //             Shift:shift_ids
        //         }
        //     }
        // );
        return res.status(200).json({result: returnable});
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }

}

const getShiftByEmployee = async (req,res)=>{
    try{
        const {employee_id,start_date,end_date} = req.body;
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);
        const shifts = await shift.findAll(
            {
                where:{
                    shift_date:{
                        [Op.between]:[startDate,endDate]
                    },
                    employee_id: employee_id
                }
            }
        );
        const returnable = await Promise.all(
            shifts.map(async (shift) =>{
                const permanent_entry = await permanent.findOne(
                    {
                        where:{
                            Shift:shift.shift_id
                        }
                    }
                );
                return {
                        target: shift.target,
                        permanent_entry
                    };
                
        }));
        return res.status(200).json({result: returnable});
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}

const getShifts = async (req,res)=>{
    try{
        const {shift_ids} = req.body;
        const shifts = await shift.findAll(
            {
                where:{
                    shift_id:shift_ids
                }
            }
        );
        const returnable = await Promise.all(
            shifts.map(async (shift) =>{
                const permanent_entry = await permanent.findOne(
                    {
                        where:{
                            Shift:shift.shift_id
                        }
                    }
                );
                return {
                        target: shift.target,
                        permanent_entry
                    };
                
        }));
        return res.status(200).json({result: returnable});
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}

const filterByTargetMet = async (req,res)=>{
    try{
        const targetsMetShifts = await permanent.findAll(
            {
                where:{
                    isTargetMet:true
                }
            }
        );
        const notMetShifts = await permanent.findAll(
            {
                where:{
                    isTargetMet:false,
                    efficiency:{
                        [Op.not]:null
                    }
                }
            }
        );
        return res.status(200).json({targetsMetShifts,notMetShifts});
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}

const filterByTarget = async (req,res)=>{
    try{
        const {target,method} = req.body;
    if(method == 'Greater'){
        const shifts = await shift.findAll(
            {
                where:{
                    target:{
                        [Op.gte]:target
                    }
                }
            }
        );
        const returnable = await Promise.all(
            shifts.map(async (shift) =>{
                const permanent_entry = await permanent.findOne(
                    {
                        where:{
                            Shift:shift.shift_id
                        }
                    }
                );
                return {
                        target: shift.target,
                        permanent_entry
                    };
                
        }));
        return res.status(200).json({result: returnable});
    }
    if(method == 'Lesser'){
        const shifts = await shift.findAll(
            {
                where:{
                    target:{
                        [Op.lte]:target
                    }
                }
            }
        );
        const returnable = await Promise.all(
            shifts.map(async (shift) =>{
                const permanent_entry = await permanent.findOne(
                    {
                        where:{
                            Shift:shift.shift_id
                        }
                    }
                );
                return {
                        target: shift.target,
                        permanent_entry
                    };
                
        }));
        return res.status(200).json({result: returnable});
    }
    else{
        return res.status(500).json({msg:"Enter some valid method! Available methods are 'Greater' and 'Lesser'"});
    }
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
}
export {getShift,getShiftByEmployee,getShifts,filterByTargetMet,filterByTarget};