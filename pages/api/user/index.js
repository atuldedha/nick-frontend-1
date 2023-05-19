import {User} from '../../../models/user'
import dbConnect from '../../../lib/dbConnect';
import isSysOp from '../../../utils/isSysOp';
import validateToken from '../../../lib/validateToken';
import Application from '../../../models/application';

export default async function(req, res){
    let { id, role } = req.query

    try{
        await dbConnect();

        let reqToken= req.headers['Authorization'] || req.headers['authorization']
        let validToken=false; 
        if(reqToken){
            reqToken= reqToken.split(' ').filter(s=> s)[1]
            validToken=validateToken(reqToken)
        }

        let result;

        if(id && id.toLowerCase()=="me" && !validToken)
            return res.status(400).json({ 
                error: "Login to see profile info."
            })

        if(id && id.toLowerCase()=="me" && validToken){
            result= await User.findOne({email: validToken.email}).select('-password').lean();
            return res.json(result);
        }

        if(!isSysOp(validToken.role)){
            return res.status(400).json({
                error: "Only system operators can see other users information."
            })
        }


        if(id){
            result= await User.findOne({_id: id}).select('-password').lean();
            return res.json(result);
        }
        if(role){
            result= await User.find({role}).select('-password').lean();
            return res.json(result)
        }
        
        result= await User.find().select('-password').lean();
        res.json(result);
        

    }catch(e){
        //console.log(e);
        res.status(500).send("Internal server error");
    }
}