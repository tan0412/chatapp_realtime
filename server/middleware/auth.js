import jwt from 'jsonwebtoken';
 import dotenv from 'dotenv';
 dotenv.config();

 export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
       
        if (token){
        const decodedToken = jwt.verify(token, process.env.secretKey) 
        req.userId = decodedToken.userId
        next()
        } else {
            return res.status(403).send({message: 'Not authorized'})
        }
 } catch (e) {
    console.log(e)
 }
}