import getPassResetParams from "../../../utils/getPassResetParams";
import isSysOp from "../../../utils/isSysOp";
import validateToken from "../../../lib/validateToken";
import Application from '../../../models/application';


export default async function(req, res){
    const { email }= req.body;

    if(!email)
        return res.status(400).json({
            error: "Email field is required."
        })

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

    
    if(!isSysOp(validToken.role))
        return res.status(400).json({
            error: "Only system operator can request reset password"
        })

    
    const host= req.headers["Host"] || req.headers["host"]

    return res.json(await getPassResetParams(email, host, req.connection.encrypted))
}