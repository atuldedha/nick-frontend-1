import { Group } from "../../../models/group";
import dbConnect from "../../../lib/dbConnect";
import verifyMembersInfo from "../../../utils/verifyMembersInfo"
import { User } from "../../../models/user";
import updateUser from "../../../utils/updateUser";
import validateToken from "../../../lib/validateToken";
import isSysOp from "../../../utils/isSysOp";
import jwt from 'jsonwebtoken';

export default async function(req, res){
    await dbConnect();
    let { 
        id,
        name,
        country,
        mainContact,
        toAdd,
        toRemove,
        toUpdate
    } = req.body;


    if(!id)
        return res.status(400).json({
            error: "Group id is required."
        })


    try{
        
        const group= await Group.findOne({_id: id})
                                .populate({
                                    path: "members",
                                    select: "-password"
                                }).lean();
       
        if(!group)
            return res.status(404).json({
                error: "No group with this id."
            })

        console.log(group)
        let groupMainContactEmail= group.members.find(m=>m.role==group.mainContact)?.email;
        let reqToken= req.headers['Authorization'] || req.headers['authorization']

        let validToken=false; 
        if(reqToken){
            reqToken= reqToken.split(' ').filter(s=> s).slice(-1)[0]
            validToken=validateToken(reqToken)
        }
        if(!validToken)
            return res.status(400).json({
                error: "Invalid Token"
            })

        console.log(validToken.email, groupMainContactEmail);
        // non system operator and non president member trying to update other user info
        if(
            !isSysOp(validToken.role) && 
            validToken.email!=groupMainContactEmail
        )
            return res.status(400).json({
                error: "Only system operator or group main contact  can change group information"
            })


       

        
        name= name || group.name;
        country= (country===undefined || country===false)? group.country: country;
        mainContact= mainContact || group.mainContact
        if(toAdd){
            const result= await verifyMembersInfo(toAdd)
            if(result.status!=200)
                return res.status(result.status).json(result);

            if(!toAdd.length)
                return res.status(200).end();
            
            toAdd= toAdd.map(m=>{ return {...m, group: group._id}})
            let  savedMembers= await User.insertMany(toAdd);
            
           
            const updatedGroup= await Group.findOneAndUpdate(
                    { _id: group._id }, 
                    { 
                        name, 
                        country,
                        mainContact,
                        $addToSet: 
                        { 'members': { 
                            $each: savedMembers.map(m=> m._id)
                            } 
                        } 
                    }, 
                    { new: true }
                ).populate('members', '-password')

            
            
            return res.status(200).json(updatedGroup);
            
        }

        if(toRemove){
            const invalid= toRemove.some( m => !m.id )
            if(invalid)
                return res.status(400).json({
                    error: "Member ids are required for remove."
                })

            toRemove= toRemove.map(m=> m.id);


            group.members= group.members.filter(m=> !toRemove.includes(m._id.toString()));
            
            let updatedGroup= await Group.findOneAndUpdate(
                                        {_id: group._id},
                                        {
                                            name, 
                                            country,
                                            mainContact,
                                            members: group.members
                                        },
                                        { new: true }
                                    ).populate('members')
            
            return res.status(200).json(updatedGroup);
        }

        if(toUpdate){
            for(let i=0; i<toUpdate.length; ++i){
                let member= toUpdate[i]

                // if all values in object are empty
                if(!Object.values(member).some(v=>v))
                    continue;

                
                let alreadyExists= member.newEmail && await User.findOne({email: member.newEmail});
                
                if(alreadyExists)
                    return res.status(400).json({
                        error: "Updated email is already in use."
                    })
                
                let result=await updateUser(member, reqToken)

                if(result.status!=200)
                    return res.status(result.status).json(result);
            }
        }

        let updatedGroup= await Group.findOneAndUpdate(
                                    {_id: group._id},
                                    {
                                        name, 
                                        country,
                                        mainContact
                                    },
                                    { new: true }
                                ).populate('members')
        
        if(req.body.tokenInResponse){
            let user = await User.findOne({ email: validToken.email })
                .populate({
                path: 'group',
                populate:{
                    path: 'members',
                    select: '-password'
                }
                })
                .lean();

            const token = jwt.sign(
                user,
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1h' }
            );
            
            return res.json({ token });
        }
            
        return res.status(200).json(updatedGroup);

    }catch(e){
        console.log(e);
    }
    
}