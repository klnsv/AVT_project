import express from 'express';
import { createEmployee,getEmployeeDetails,editEmployee,deleteEmployee } from '../controllers/employee_controller.js';

const router = express.Router();

router.get('/fetch',getEmployeeDetails);
router.post('/create',createEmployee);
router.put('/edit',editEmployee);
router.delete('/delete',deleteEmployee);

export default router;