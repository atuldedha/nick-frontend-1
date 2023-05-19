import Application from '../../../models/application';
import isSysOp from '../../../utils/isSysOp';
import validateToken from '../../../lib/validateToken';
import dbConnect from '../../../lib/dbConnect'
import { Group } from '../../../models/group';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    let reqToken = req.headers['Authorization'] || req.headers['authorization']
    let token = false;
    if (reqToken) {
        reqToken = reqToken.split(' ').filter(s => s)[1]
        token = validateToken(reqToken)
    }

    if (!token)
        res.status(401).send("Invalid Token")

    const group = await Group.findOne({ _id: token.group._id })

    console.log(token.role, group)

    if (!token.role || token.role != group.mainContact)
        return res.status(400).json({
            error: "Only group primary contact can apply for parade."
        })



    try {
        await dbConnect();

        const updateData = {
            year: new Date(Date.now()).getFullYear(),
            walkers: req.body.walkers || 0,
            cars: req.body.cars || 0,
            suvs: req.body.suvs || 0,
            pickups: {
                quantity: req.body.pickups?.quantity || 0,
                brands: req.body.pickups?.brands || []
            },
            trailer: req.body.trailer || {},
            float: {
                length: req.body.float?.length || 0,
                fireExtinguisher: req.body.float?.fireExtinguisher || false
            },
            animals: {
                horses: req.body.animals?.horses || 0,
                dogs: req.body.animals?.dogs || 0,
                others: req.body.animals?.others || ""
            },
            horseCertificateOfInsurance: req.body.horseCertificateOfInsurance || false,
            section: req.body.section || "",
            status: "TO BE ACCEPTED",
            group: token.group._id
        };

        const query = { group: token.group._id, year: new Date(Date.now()).getFullYear() };
        const options = { upsert: true, new: true };

        const application = await Application.findOneAndUpdate(query, updateData, options);

        await Group.findByIdAndUpdate(token.group._id, { application: application._id });
        
        return res.status(201).json(application);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}