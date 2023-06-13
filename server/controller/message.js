import Message from "../models/Message.js";


export const getMessage = async (req, res) => {
    try {
        const recipient = req.params.recipient
        const userId = req.userId;
        const messages = await Message.find({
            $or: [
                {sender: userId, recipient: recipient},
                {sender: recipient, recipient:userId},
            ] 
        }).sort({timestamp: -1})
       return res.status(200).send(messages)
    } catch(e){
        console.error(e);
    }
  }