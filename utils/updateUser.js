import {User} from "../models/user"
import {Group} from "../models/group";
import validateToken  from "../lib/validateToken";
import dbConnect from "../lib/dbConnect";

import isSysOp from "./isSysOp";

export default async function (body, reqToken){
    await dbConnect()
    const { 
        firstName, 
        lastName, 
        phoneNumber, 
        email,
        newEmail,
        walkieTalkieAccess,
        password , 
        oldPassword,
        role
    }= body;

    try{
        const user= await User.findOne({ email }).lean();

        user.firstName= firstName || user.firstName
        user.lastName= (lastName===undefined || lastName===false)  ? user.lastName: lastName
        user.phoneNumber= phoneNumber || user.phoneNumber
        user.email= newEmail || user.email
        user.role= role || user.role
        user.walkieTalkieAccess= walkieTalkieAccess || user.walkieTalkieAccess



        if(!user)
            return {
                status: 400,
                error: "No account found with this email."
            }

        let alreadyExists= newEmail && await User.findOne({email: newEmail});
            
        if(alreadyExists)
            return {
                status: 400,
                error: "Updated email is already in use."
            }
        
        let validToken=false; 
        if(reqToken){
            reqToken= reqToken.split(' ').filter(s=> s).slice(-1)[0]
            validToken=validateToken(reqToken)
        }
        if(!validToken)
            return res.status(400).json({
                error: "Invalid Token"
            })
        // non system operator user trying to update other user info
        if(
            !isSysOp(validToken.role) && 
            validToken.email!=email
        )
            return {
                status: 400,
                error: "Only system operator can change other user information"
            }

        if(password){
            user.password= password;
        }
        // delete password to avoid rehashing during update.
        else delete user['password'];

        const updatedUser= await User.findOneAndUpdate(
                                    { email },
                                    user,
                                    {new: true}
                                ).populate({
                                    path: 'group',
                                    populate:{
                                        path: 'members',
                                        select: '-password'
                                    }
                                 }).lean();
        
        delete updatedUser['password'];
        return {
            status: 200,
            updatedUser
        }
    }catch(e){
        console.log(e)
        return {
            status: 500,
            error: ""
        }
    }
}

