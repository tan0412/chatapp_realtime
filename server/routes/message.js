import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getMessage } from '../controller/message.js';

const router = express.Router()

router.get('/user/message/:recipient', verifyToken, getMessage)

export default router;