import {User} from '../../../models/user'
import { PassResetToken } from '../../../models/PassResetToken'
import dbConnect from '../../../lib/dbConnect';
import validateToken from '../../../lib/validateToken'
import Application from '../../../models/application';



export default async(req, res)=>{
   try{
        const {token, password}= req.body;
        if(!token)
            return res.status(401).json({
                error: "Token is required to reset password."
            });

        if(!password)
            return res.status(400).json({
                error: "Password feild is requried."
            });

        await dbConnect();
        
        let savedResetToken=await PassResetToken.findOne({token}).lean();
        if(!savedResetToken)
            return res.status(400).json({
                error: "Either this link is already used or no password reset was requested."
            })
        
        await User.findOneAndUpdate({email:savedResetToken.email}, {password});
        await PassResetToken.deleteOne({token});
        res.json({
            success: true
        })
    }catch(e){
        console.log(e);
        return res.status(500).end();
    }
}