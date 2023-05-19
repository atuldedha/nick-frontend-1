import { Group } from "../../../models/group";
import dbConnect from "../../../lib/dbConnect";
import Application from '../../../models/application';



export default async  function(req, res){
    let result;
    try{
        await dbConnect();
        if(req.query.id){
            result= await Group.findOne({_id: req.query.id})
                               .populate('members', '-password')
                               .populate('application')
                               .lean();
        }else{
            result= await Group.find()
                               .populate('members', '-password')
                               .populate('application')
                               .lean();            
        }
       
        res.json(result)
    }catch(e){
        console.log(e)
    }

}