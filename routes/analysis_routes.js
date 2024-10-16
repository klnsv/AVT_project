import {getShift,getShiftByEmployee,filterByTarget,filterByTargetMet,getShifts} from '../controllers/analysis.js';
import express from 'express';

const router = express.Router();


router.get('/shiftDetails',getShift);
router.get('/employeeDetails',getShiftByEmployee);
router.get('/filterByTarget',filterByTarget);
router.get('/filterByMet',filterByTargetMet);
router.get('/getShifts',getShifts);

export default router;

