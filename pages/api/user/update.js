import { User } from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import Application from '../../../models/application';
import updateUser from "../../../utils/updateUser";


export default async function(req, res){
    await dbConnect()
    try{
        let reqToken= req.headers['Authorization'] || req.headers['authorization']

        let result= await updateUser(req.body, reqToken);
        if(result.status!=200)
            return res.status(result.status).json(result)


        const token = jwt.sign(
            result.updatedUser,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' } 
        );
        res.json({token})
    }catch(e){
        console.log(e);
    }
}