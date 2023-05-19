import { User } from "../../../models/user";
import { Group } from "../../../models/group";
import dbConnect from "../../../lib/dbConnect";
import verifyUserInfo from '../user/register';
import jwt from "jsonwebtoken";
import verifyMembersInfo from '../../../utils/verifyMembersInfo';
import getPassResetParams from "../../../utils/getPassResetParams";
import Application from '../../../models/application';





export default async function (req, res) {
    await dbConnect()
    
    const {name, country, countryRepresentative, members}= req.body
    if(!name)
        return res.status(400).json({
            error: "Group name field is required."
        })
   
    if(!members || ! members.length)
        return res.status(400).json({
            error: "Group members are required."
        })


    
    let result= await verifyMembersInfo(members);

    if(result.status!=200)
        return res.status(result.status).json(result)

   
    let savedMembers= await User.insertMany(members);
    req.body.members= savedMembers.map(m=> m._id);
    
    try {
        const group = await Group.create(req.body);
        let updatedMembers=[]
        for(let i=0; i< savedMembers.length; ++i){
            let updatedMember=await User.findOneAndUpdate(
                        {_id: savedMembers[i]._id}, 
                        {
                            group: group._id
                        },
                        {new: true, upsert: true},
                    ).populate({
                        path: 'group',
                        populate: {
                            path: "members",
                            select: "-password"
                        }
                    }).lean();

            updatedMembers.push(updatedMember);
        }

        const membersPassResetParams= []

        for(let i=0; i<members.length; ++i){
            
            if(!members[i].password){
                const host= req.headers["Host"] || req.headers["host"]
                membersPassResetParams.push(await getPassResetParams(members[i].email, host, req.connection.encrypted));
            }
        }

        const president=updatedMembers.find(m=> m.role=="groupPresident")
        delete president['password']
        const token = jwt.sign(
            president,
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' } 

        );
        if(membersPassResetParams.length){
            return res.json({
                sendResetMail: true,
                resetTemplateParams: membersPassResetParams,
                token
            })
        }
        else return res.json({token});
    } catch (err) {
        console.log(err);
        return res.json({ error: err });
    }
}
