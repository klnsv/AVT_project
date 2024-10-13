import express from 'express';
import { addShift,deleteShift,updateShift,getShiftDetails } from '../controllers/shift_controller.js';

const router = express.Router();

router.post('/add',addShift);
router.delete('/delete',deleteShift);
router.put('/update',updateShift);
router.get('/get',getShiftDetails);
export default router;