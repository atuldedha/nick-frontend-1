import { User } from "../../../models/user";
import { Group } from "../../../models/group";
import Application from '../../../models/application';

import { PassResetToken } from "../../../models/PassResetToken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dbConnect from "../../../lib/dbConnect";
import register from "../group/register";
import verifyUserInfo from "../../../utils/verifyUserInfo"
import getPassResetParams from "../../../utils/getPassResetParams";







async function registerUser(user, host, resetHttps){
    await dbConnect()

    let result= await verifyUserInfo(user)
    if(result.status!=200)
        return result
    
    
   

    // creating user
    let savedUser = await User.findOneAndUpdate(
                                {email: user.email},
                                user,
                                {
                                    new: true,
                                    upsert: true
                                }).populate({
                                    path: 'group',
                                    populate:{
                                        path: 'members',
                                        select: '-password'
                                    }
                                 })
                                 .lean();

    if(!user.password){
        return {
            status: 200,
            sendResetMail: true,
            templateParams: await getPassResetParams(user.email, host, resetHttps)
        }
    }
    delete savedUser['password']
    const token = jwt.sign(
        savedUser,
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' } 
    );

    return { 
        status: 201,
        token 
    };
 

}

export default async function(req, res) {
    if(req.method!="POST")
        return res.status(404).end()

    const host= req.headers["Host"] || req.headers["host"];

    const result= await registerUser(req.body, host, req.connection.encrypted)
    res.status(result.status).json(result)
}