import Application from '../../../models/application';
import dbConnect from '../../../lib/dbConnect';
import isSysOp from '../../../utils/isSysOp';
import validateToken from '../../../lib/validateToken';

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;

    if (method !== 'PUT')
        return res.status(405).send("Method not supported")

    let reqToken = req.headers['Authorization'] || req.headers['authorization']
    let token = false;
    if (reqToken) {
        reqToken = reqToken.split(' ').filter(s => s)[1]
        token = validateToken(reqToken)
    }

    if (!token)
        res.status(401).send("Invalid Token")

    if (!isSysOp(token.role))
        return res.status(401).send("Only system operator can update applications");


   

    try {
        await dbConnect();
        const updatedApplication = await Application.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedApplication) {
            return res.status(404).json({ success: false });
        }

        res.status(200).json({ success: true, data: updatedApplication });
    } catch (error) {
        res.status(400).json({ success: false });
    }
}
