import User from "../models/User.js";

export const getStatusUser = async (req, res) => {
    try {
        const { status } = req.body
        const userId = req.userId;
        await User.findByIdAndUpdate(userId, {status: status}, {new:true});
        return res.status(200).json({message: 'User saved successfully'});
    } catch(e){
        console.error(e);
    }
}

export const getInforUser = async (req, res) => {
        const userId = req.userId;
        const user = await User.findById(userId);
        res.status(200).send(user);
 }
  
export const updateInfoUser = async (req, res) => {
    try {
        const { name, email, phone, picture } = req.body;
        const userId = req.userId
        await User.findByIdAndUpdate(userId, { name: name, email: email, phone: phone, picture: picture }, {new: true})
        return res.status(200).json({ message: 'ok' });
    } catch (error) {
        console.log(error);
        res.status(500).send('Unauthorized');
    }
 }

export const getSearchUser = async (req, res) => {
    try {
    const phone = req.params.phone;
    const user = await User.findOne({phone: phone})
    if (!user) {
       res.status(202).send('Not Found');
    } else{
        const {_id, name, phone, picture} = user
        res.status(200).send({name, phone, picture, _id})}
 } catch (error) {
    console.error(error)
 }
}
