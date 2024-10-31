// This file contains all the controllers concerning the shift ie adding shift, deleting shift, updating shift, reading all the shifts etc
import shift from "../models/shift.js";
import employees from "../models/employee.js";
import permanents from "../models/permanent.js";
import temporary from "../models/temporary.js";
import sequelize from "../config/connection.js";
const getAggregatedData = async (shiftId) => {
    try {
        const query = `
            WITH LaggedData AS (
                SELECT 
                    t.mach_id, 
                    t.proximity_count,
                    t.timestamps,
                    p.isTargetMet,
                    p.id AS id,
                    s.shift_id,
                    s.target,
                    TIMESTAMPDIFF(MINUTE, LAG(t.timestamps) OVER (PARTITION BY t.mach_id, t.permanent_id ORDER BY t.timestamps), t.timestamps) AS idle_time_diff,
                    TIMESTAMPDIFF(MINUTE,s.start_time,MIN(t.timestamps) OVER (PARTITION BY t.permanent_id)) AS slowStart,
                    SUM(t.proximity_count) OVER (PARTITION BY s.shift_id) / s.target AS efficiency
                FROM temporary t
                JOIN permanents p ON t.permanent_id = p.id
                JOIN shift s ON p.Shift = s.shift_id
                WHERE p.Shift = :shiftId
            ),

            AggregatedData AS (
                SELECT 
                    SUM(l.proximity_count) AS Count,
                    MAX(l.efficiency) AS efficiency,
                    SUM(CASE WHEN l.proximity_count = 0 THEN l.idle_time_diff ELSE 0 END) AS IdleTime,
                    SUM(CASE WHEN l.idle_time_diff > 10 THEN l.idle_time_diff ELSE 0 END) AS NonWorking,
                    CASE WHEN SUM(l.proximity_count) >= MAX(l.target) THEN 1 ELSE 0 END AS isTargetMet,
                    l.id AS permanent_id
                FROM LaggedData l
                GROUP BY l.id, l.isTargetMet
            )

            SELECT * FROM AggregatedData;
        `;

        // Execute the query
        const result = await sequelize.query(query, {
            replacements: { shiftId },
            type: sequelize.QueryTypes.SELECT
        });

        console.log(result);
        console.log(result[0].Count);// Output the result
        return result;       // Return result if needed
    } catch (error) {
        console.error('Error executing query:', error);
        throw error;
    }
};

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
        const {shift_id} = req.params;
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
        const {shift_id} = req.params;
        const {
            start_time,
            end_time,
            target,
            operation_type,
            mach_id,
            shift_duration,
            shift_date,
            employee_id
        } = req.body;
    
        const selected_shift = await shift.findOne({
            where:{
                shift_id:shift_id
            }
        });

        if(!selected_shift){
            return res.status(404).json({msg:`The shift with the given shift_id ${shift_id} cannot be found!!`});
        }
        
        const updatedFields = {};
        if (start_time !== undefined) updatedFields.start_time = start_time;
        if (end_time !== undefined) updatedFields.end_time = end_time;
        if (target !== undefined) updatedFields.target = target;
        if (operation_type !== undefined) updatedFields.operation_type = operation_type;
        if (mach_id !== undefined) updatedFields.mach_id = mach_id;
        if (shift_duration !== undefined) updatedFields.shift_duration = shift_duration;
        if (shift_date !== undefined) updatedFields.shift_date = shift_date;
        if (employee_id !== undefined) updatedFields.employee_id = employee_id;
        await selected_shift.update(updatedFields);
        return res.status(200).json({msg:`The shift with the shift_id ${shift_id} has been updated!!`,shift: selected_shift});
    }
    catch(err){
        return res.status(500).json({msg:err.message});
    }
    
}

const getShiftDetails = async(req,res) =>{
    try{
        const {shift_id} = req.params;
        const selected_shift = await shift.findOne({
            where:{
                shift_id:shift_id
            }
        });
        if(!selected_shift){
            return res.status(404).json({msg:`The shift with the given shift_id ${shift_id} cannot be found!!`});
        }
        //return res.status(200).json({msg: selected_shift});
        const permanent_entry = await permanents.findOne(
            {
                where:{
                    Shift:shift_id
                }

            }
        );
        if(permanent_entry.efficiency == null){
            const temps = await temporary.findAll({
                where:{
                    permanent_id:permanent_entry.id
                }
            });
            // const sum_count = await temps.sum('proximity_count');
            // const efficiency = selected_shift.target/sum_count;
            //const returnable = {};
            // returnable.MachName = permanent_entry.MachName;
            // returnable.OperatorID = permanent_entry.OperatorID;
            // returnable.Shift = permanent_entry.Shift;
            // returnable.Date = permanent_entry.Date;
            // returnable.MachStatus = 'Active';
            // returnable.OperationType = permanent_entry.OperationType;
            // returnable.StartTime = permanent_entry.StartTime;
            // returnable.EndTime = permanent_entry.EndTime;

            

            // Example usage
            const res1 = await getAggregatedData(shift_id); // Pass the shift ID as needed
            const returnable = {
                count: res1[0].Count,
                efficiency: res1[0].efficiency,
                IdleTime: res1[0].IdleTime,
                NonWorking: res1[0].NonWorking,
                MachName: permanent_entry.MachName,
                OperatorID: permanent_entry.OperatorID,
                Shift: permanent_entry.Shift,
                Date: permanent_entry.Date,
                MachStatus: 'Active',
                OperationType: permanent_entry.OperationType,
                StartTime: permanent_entry.StartTime,
                EndTime: permanent_entry.EndTime
            };
            console.log("Wattakaayi");
            console.log(res1.Count);
            return res.json({msg:returnable});

            
        }
        else{
            const returnable ={
                count: permanent_entry.Count,
                efficiency: permanent_entry.efficiency,
                IdleTime: permanent_entry.IdleTime,
                NonWorking: permanent_entry.NonWorking,
                MachName: permanent_entry.MachName,
                OperatorID: permanent_entry.OperatorID,
                Shift: permanent_entry.Shift,
                Date: permanent_entry.Date,
                MachStatus: permanent_entry.MachStatus,
                OperationType: permanent_entry.OperationType,
                StartTime: permanent_entry.StartTime,
                EndTime: permanent_entry.EndTime,
                Target: selected_shift.target
            }
            return res.json({msg:returnable});
        }
    }
    catch(err){
        return res.status(500).json({msg:err});
    }
}
export {addShift,deleteShift,updateShift,getShiftDetails};