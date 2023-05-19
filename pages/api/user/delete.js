import {User} from '../../../models/user';
import dbConnect from "../../../lib/dbConnect";
import Application from '../../../models/application';



export default async function(req, res){
    if(req.method!="POST")
        return res.status(404).send("NOT FOUND");


    const { ids }= req.body;

    try{
        await dbConnect();
        await User.deleteMany({_id:{ $in:  ids}})
        res.json({
            success: true
        })
    }catch(e){
        res.status(500).end();
    }
}