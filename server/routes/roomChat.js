import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { getRoomChat } from '../controller/roomChat.js';

const router = express.Router()

router.get('/chatroom', verifyToken, getRoomChat)

export default router;