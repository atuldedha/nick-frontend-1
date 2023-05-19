import { User } from "../../../models/user";
import { Group } from "../../../models/group";
import Application from '../../../models/application';

import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import dbConnect from "../../../lib/dbConnect";

export default async function loginUser(req, res) {
    if(req.method!="POST")
        return res.status(400).end()
    await dbConnect()
    const { email, password } = req.body;
    if(!email)
        return res.status(400).json({
            error: "Email field is required."
        })

    let user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } })
                         .populate({
                            path: 'group',
                            populate:{
                                path: 'members',
                                select: '-password'
                            }
                         })
                         .lean();
    
    if (!user) 
        return res.status(400).json({ error: "User not found" });
    
    
    const passMatched = await bcrypt.compare(password, user.password);

    if (!passMatched) 
        return res.status(401).json({
            error: "Invalid password."
        })

    if(passMatched && password=="")
        return res.json({ updatePassword: true})

    user= JSON.parse(JSON.stringify(user))
    delete user['password']

    const token = jwt.sign(
        user,
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' } 
    );
    return res.json({ token });
}
