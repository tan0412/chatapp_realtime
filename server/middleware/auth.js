import jwt from 'jsonwebtoken';
 import dotenv from 'dotenv';
 dotenv.config();

 export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.secretKey)
        req.userId = decodedToken.userId
        next()
 } catch (e) {
    console.log(e)
 }
}