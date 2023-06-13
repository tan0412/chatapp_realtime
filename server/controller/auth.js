import bcrypt from 'bcrypt';
import  User  from '../models/User.js'
import  jwt  from 'jsonwebtoken';

function generateToken(user) {
    const payload = {
        userId: user.id,
    }
    const options = {expiresIn: '1d'}
    return jwt.sign(payload, process.env.secretKey, options)
}

export const register = async (req, res) => {
    try {
        const { name, email,  password, phone } = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(201).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword, phone}); 
        await user.save();
        res.status(200).json({message: 'User created'});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const login =  async (req, res) => {
    try {
        const { email, password, deviceToken } = req.body; 
        const user = await User.findOne({email})   
        if(!user) {
            return res.status(201).json({ message: 'User does not exist' });
        } 
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword){
            return res.status(202).json({ message: 'Password Invalid' });
        }
        const token = generateToken(user);
        user.token = token;
        user.deviceToken = deviceToken;
        user.status = 'online'
        await user.save();
        return res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
 }
