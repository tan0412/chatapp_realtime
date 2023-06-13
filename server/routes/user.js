import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getInforUser, getSearchUser, getStatusUser, updateInfoUser } from '../controller/user.js';

const router = express.Router()

router.get('/users', verifyToken, getInforUser )
router.put('/update', verifyToken, updateInfoUser)
router.get('/list_user/:phone', verifyToken, getSearchUser)
router.put('/user/status', verifyToken, getStatusUser)

export default router;