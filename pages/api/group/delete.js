import { Group } from '../../../models/group';
import { User } from "../../../models/user";
import dbConnect from "../../../lib/dbConnect";
import Application from '../../../models/application';


export default async function (req, res) {
    if (req.method != "POST")
        return res.status(404).send("NOT FOUND");


    const { ids } = req.body;

    try {
        await dbConnect();
        let groups = await Group.find({ _id: { $in: ids } }).lean();

        let allMembers = []
        groups.forEach(function (group) {
            allMembers = [...allMembers, ...group.members.map(m => m._id.toString())]
        })

        // Delete all applications related to the groups
        await Application.deleteMany({ group: { $in: ids } });

        await User.deleteMany({ _id: { $in: allMembers } })
        await Group.deleteMany({ _id: { $in: ids } })
        res.json({
            success: true
        })
    } catch (e) {
        console.log(e);
        res.status(500).end();
    }
}