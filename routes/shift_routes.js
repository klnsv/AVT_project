import express from 'express';
import { addShift,deleteShift,updateShift,getShiftDetails } from '../controllers/shift_controller.js';

const router = express.Router();

router.post('/add',addShift);
router.delete('/delete/:shift_id',deleteShift);
router.put('/update/:shift_id',updateShift);
router.get('/get/:shift_id',getShiftDetails);
export default router;