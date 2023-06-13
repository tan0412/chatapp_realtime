import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { cancelFriendRequest, getListFriends, getListRecipientsFriendRequest, getListSendersFriendRequest, getResFriendRequest, sendFriendRequest } from '../controller/friend.js';

const router = express.Router()

router.post('/user/friend-request', verifyToken, sendFriendRequest)
router.put('/user/friend-request/accepted', verifyToken, getResFriendRequest)
router.get('/users/friend-request/recipient', verifyToken, getListSendersFriendRequest)
router.get('/user/list-friend', verifyToken, getListFriends)
router.get('/users/friend-request/sent', verifyToken, getListRecipientsFriendRequest )
router.get('/user/friend-request/cancel', verifyToken, cancelFriendRequest)

export default router;