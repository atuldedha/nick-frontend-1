import Application from '../../../models/application'; 
import dbConnect from '../../../lib/dbConnect';
import isSysOp from '../../../utils/isSysOp';
import validateToken from '../../../lib/validateToken';


export default async function handler(req, res) {
    if (req.method !== 'DELETE')
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    
    let reqToken = req.headers['Authorization'] || req.headers['authorization']
    let token = false;
    if (reqToken) {
        reqToken = reqToken.split(' ').filter(s => s)[1]
        token = validateToken(reqToken)
    }

    if(!token)
        res.status(401).send("Invalid Token")

    if(!isSysOp(token.role))
        return res.status(401).send("Only system operator can delete applications");


    const { ids } = req.body;
    try {
        await dbConnect();
        const result = await Application.deleteMany({ _id: { $in: ids } });
        res.status(200).json({ success: true, deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}
