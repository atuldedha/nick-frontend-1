import registerGroup from "./register";
import getGroup from "./get";
import updateGroup  from "./update";
import Application from '../../../models/application';



export default function(req, res){

    if(req.method=="POST")
        return registerGroup(req, res);

    if(req.method=="GET")
        return getGroup(req, res);

    if(req.method=="PUT")
        return updateGroup(req, res);
    
}