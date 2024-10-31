import permanent from '../models/permanent.js';
import shift from '../models/shift.js';
import { Op, where } from 'sequelize';
import temporary from '../models/temporary.js';
import employees from '../models/employee.js';
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

const fulldayShifts = async (req,res)=>{
    const {date} = req.body;
    const selected_date = new Date(date);
    const startOfDate = new Date(`${date} 00:00:00`);
    const endOfDate = new Date(`${date} 23:59:59`);
    try{
        const shifts = await shift.findAll({
            where:{
                shift_date:date
            }
        });
        const target_sum = await shift.sum('target',{where:{shift_date:selected_date.toISOString().split('T')[0]}});
        //console.log(shifts)
        // const employee_ids = shifts.map( (shift)=>{
        //     return shift.employee_id
        // });
        const employee_ids = shifts.map((shift) => {
            console.log(shift.dataValues.employee_id);
            return shift.dataValues.employee_id
            //mach_id: shift.mach_id
        });
        //console.log(employee_ids);
        // const employees_details = await employees.findAll({
        //     where:{
        //         employee_id:{
        //             [Op.in]:employee_ids
        //         }
        //     }
        // });
        // const rfids = employees_details.map((employee)=>{
        //     employee.rfid
        // });
        const mach_ids = shifts.map((shift)=>{
            return shift.dataValues.mach_id
        });
        console.log(mach_ids);
        const temporary_entries = await temporary.findAll({
            where:{
                timestamps: {
                    [Op.between]:[startOfDate,endOfDate]
                },
                employee_id:{
                    [Op.in]:employee_ids
                }
    
            }
        });
        //console.log(temporary_entries);
        const tempEmployeeIds = temporary_entries.map((entry) => entry.dataValues.employee_id);
        const tempMachIds = temporary_entries.map((entry) => entry.mach_id);
        // Finding employee_ids that are not in temporary_entries
        const notInTemporaryEntries = employee_ids.filter((id) => !tempEmployeeIds.includes(id));
        const inTempEntries = employee_ids.filter((id) => tempEmployeeIds.includes(id));
        const notInTemporaryEntries_mach = mach_ids.filter((id) => !tempMachIds.includes(id));
        const inTemp_mach = mach_ids.filter((id) => tempMachIds.includes(id));
        const presentMachDetails = await permanent.findAll({where:{MachName:{[Op.in]:inTemp_mach},Date:{[Op.between]:[startOfDate,endOfDate]}}});
            console.log(presentMachDetails);
            const mach_idle_nonWorking_details = [];
            const intermediate_class = presentMachDetails.map((mach)=> {
                const target = Math.round(mach.dataValues.Count/mach.dataValues.efficiency);
                return {
                    MachName: mach.dataValues.MachName,
                    target: target,
                    count:mach.dataValues.Count,
                    efficiency:mach.dataValues.efficiency,
                    operatorID: mach.dataValues.OperatorID,
                    idleTime: mach.dataValues.IdleTime,
                    nonWorking:mach.dataValues.NonWorking
                }
            });
        console.log(intermediate_class);

        const notPresentRFIDS = await employees.findAll({
            where:{
                employee_id:{
                    [Op.in]:notInTemporaryEntries
                }
            }
        });
        const PresentRFIDS = await employees.findAll({
            where:{
                employee_id:{
                    [Op.in]:inTempEntries
                }
            }
        });
        const absentRFIDS = notPresentRFIDS.map((employee)=> employee.dataValues.rfid);
        const absentNames = notPresentRFIDS.map((employee)=> employee.dataValues.employee_name);
    
        const presentRFIDS = PresentRFIDS.map((employee)=> employee.dataValues.rfid);
        const presentNames = PresentRFIDS.map((employee)=> employee.dataValues.employee_name);
        console.log(absentRFIDS);
        console.log(notInTemporaryEntries_mach);
        console.log(notInTemporaryEntries); 
        // const proximity_sum = await permanent.sum('Count', {
        //     where: {
        //         Date: selected_date // Ensure 'date' is in the correct format
        //     }
        // });
        // const idleTime = await permanent.sum('IdleTime',{where:{Date:selected_date}});
        // const nonWorking = await permanent.sum('NonWorking',{where:{Date:selected_date}});
    
        const proximity_sum = await permanent.sum('Count', {
            where: {Date:{[Op.between]:[startOfDate,endOfDate]}}
        });
        const idleTime = await permanent.sum('IdleTime',{where:{Date:{[Op.between]:[startOfDate,endOfDate]}}});
        const nonWorking = await permanent.sum('NonWorking',{where:{Date:{[Op.between]:[startOfDate,endOfDate]}}});
        // const wads = await permanent.findAll({where:{
        //     Date:selected_date
        // }})
        console.log(proximity_sum,idleTime,nonWorking);
    
        res.json({proximity_sum:proximity_sum,
            target: target_sum,
            absentNames:absentNames,
            notPresentIDS:notInTemporaryEntries,
            notPresentRFIDS:absentRFIDS,
            presentNames:presentNames,
            presentRFIDS:presentRFIDS,
            presentEmployeeDetails:PresentRFIDS,
            presentMachs: inTemp_mach,
            presentMachDetails: intermediate_class,
            notPresentMachines:notInTemporaryEntries_mach,
            idleTime:idleTime,
            nonWorking:nonWorking,
            absentEmployeeDetails:notPresentRFIDS});
    }
    catch(err){
        res.status(500).json({msg:err.message});
    }
    
}

const getDayAnalysis = async (req,res)=>{
    const {start_date,end_date} = req.body;
    // start_date = new Date(start_date);
    // end_date = new Date(end_date);
    const returnable_object = {};
    //console.log(start_date);
    //const selected_date = new Date(start_date);
    const startOfDate = new Date(`${start_date} 00:00:00`);
    console.log(startOfDate);
    const real_end = new Date(`${end_date} 23:59:59`);
    const endOfDate = new Date(`${start_date} 23:59:59`);
    try{
        while(startOfDate<=real_end){
            const selected_date = startOfDate;
            // const startOfDate = new Date(`${start_date} 00:00:00`);
            // const endOfDate = new Date(`${start_date} 23:59:59`);
            endOfDate.setHours(startOfDate.getHours()+23);
            endOfDate.setMinutes(endOfDate.getMinutes()+59);
            console.log(startOfDate);
            const shifts = await shift.findAll({
                where:{
                    shift_date:startOfDate
                }
            });
    
            //console.log(shifts)
            // const employee_ids = shifts.map( (shift)=>{
            //     return shift.employee_id
            // });
            const employee_ids = shifts.map((shift) => {
                //console.log(shift.dataValues.employee_id);
                return shift.dataValues.employee_id
                //mach_id: shift.mach_id
            });
            const heheboi = new Date(startOfDate.getTime() + 24 * 60 * 60 * 1000);
            const target_sum = await shift.sum('target',{where:{shift_date:heheboi.toISOString().split('T')[0]}});
            //console.log(employee_ids);
            // const employees_details = await employees.findAll({
            //     where:{
            //         employee_id:{
            //             [Op.in]:employee_ids
            //         }
            //     }
            // });
            // const rfids = employees_details.map((employee)=>{
            //     employee.rfid
            // });
            const mach_ids = shifts.map((shift)=>{
                return shift.dataValues.mach_id
            });
            //console.log(mach_ids);
            const temporary_entries = await temporary.findAll({
                where:{
                    timestamps: {
                        [Op.between]:[startOfDate,endOfDate]
                    },
                    employee_id:{
                        [Op.in]:employee_ids
                    }
    
                }
            });
            //console.log(temporary_entries);
            const tempEmployeeIds = temporary_entries.map((entry) => entry.dataValues.employee_id);
            const tempMachIds = temporary_entries.map((entry) => entry.mach_id);
            // Finding employee_ids that are not in temporary_entries
            const notInTemporaryEntries = employee_ids.filter((id) => !tempEmployeeIds.includes(id));
            const inTempEntries = employee_ids.filter((id) => tempEmployeeIds.includes(id));
            const notInTemporaryEntries_mach = mach_ids.filter((id) => !tempMachIds.includes(id));
            const inTemp_mach = mach_ids.filter((id) => tempMachIds.includes(id));
            const presentMachDetails = await permanent.findAll({where:{MachName:{[Op.in]:inTemp_mach},Date:{[Op.between]:[startOfDate,endOfDate]}}});
            console.log(presentMachDetails);
            const mach_idle_nonWorking_details = [];
            const intermediate_class = presentMachDetails.map((mach)=> {
                const target = Math.round(mach.dataValues.Count/mach.dataValues.efficiency);
                return {
                    MachName: mach.dataValues.MachName,
                    target: target,
                    count:mach.dataValues.Count,
                    efficiency:mach.dataValues.efficiency,
                    operatorID: mach.dataValues.OperatorID,
                    idleTime: mach.dataValues.IdleTime,
                    nonWorking:mach.dataValues.NonWorking
                }
            });
            const notPresentRFIDS = await employees.findAll({
                where:{
                    employee_id:{
                        [Op.in]:notInTemporaryEntries
                    }
                }
            });
            const PresentRFIDS = await employees.findAll({
                where:{
                    employee_id:{
                        [Op.in]:inTempEntries
                    }
                }
            });
            const absentRFIDS = notPresentRFIDS.map((employee)=> employee.dataValues.rfid);
            const absentNames = notPresentRFIDS.map((employee)=> employee.dataValues.employee_name);
    
            const presentRFIDS = PresentRFIDS.map((employee)=> employee.dataValues.rfid);
            const presentNames = PresentRFIDS.map((employee)=> employee.dataValues.employee_name);
            // console.log(absentRFIDS);
            // console.log(notInTemporaryEntries_mach);
            // console.log(notInTemporaryEntries); 
            const proximity_sum = await permanent.sum('Count', {
                where: {Date:{[Op.between]:[startOfDate,endOfDate]}}
            });
            const idleTime = await permanent.sum('IdleTime',{where:{Date:{[Op.between]:[startOfDate,endOfDate]}}});
            const nonWorking = await permanent.sum('NonWorking',{where:{Date:{[Op.between]:[startOfDate,endOfDate]}}});
            // const wads = await permanent.findAll({where:{
            //     Date:selected_date
            // }})
            //console.log(proximity_sum,idleTime,nonWorking);
            const date_data = {
                proximity_sum:proximity_sum,
                target: target_sum,
                absentNames:absentNames,
                notPresentIDS:notInTemporaryEntries,
                notPresentRFIDS:absentRFIDS,
                presentNames:presentNames,
                presentRFIDS:presentRFIDS,
                presentEmployeeDetails:PresentRFIDS,
                presentMachs: inTemp_mach,
                presentMachDetails: intermediate_class,
                notPresentMachines:notInTemporaryEntries_mach,
                idleTime:idleTime,
                nonWorking:nonWorking,
                absentEmployeeDetails:notPresentRFIDS
            };
            
            startOfDate.setDate(startOfDate.getDate()+1);
            returnable_object[startOfDate.toISOString().split('T')[0]]= date_data;
            //console.log(startOfDate);
    
        }
        res.status(200).json({msg:returnable_object});
    }
    catch(err){
        res.status(500).json({msg: err.message});
    }
}
export {getShift,getShiftByEmployee,getShifts,filterByTargetMet,filterByTarget,fulldayShifts,getDayAnalysis};