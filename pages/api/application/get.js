import dbConnect from "../../../lib/dbConnect";
import Application from "../../../models/application";
import { User } from "../../../models/user";
import { Group } from "../../../models/group";

export default async function handler(req, res) {

    if (req.method !== "GET")
        res.status(400).json({ message: "Invalid request method" });

    try {
        await dbConnect();

        let status = req.query.status?.split(',').map(v => v.trim().toUpperCase()) ||
            ['ACCEPTED', 'TO BE ACCEPTED', 'REJECTED']
        let searchCriteria = { group: req.query.groupId }
        if (req.query.groupId == "all")
            searchCriteria = {}

        if (req.query.status)
            searchCriteria.status = { "$in": status }
        if (req.query.year)
            searchCriteria.year = parseInt(req.query.year)


        const applications = await Application.find(searchCriteria)
            .sort({ createdAt: -1 })
            .populate({
                path: 'group',
                populate: {
                    path: 'members',
                    select: '-password'
                }
            })
            .exec();

        if (req.query.groupId != "all")
            res.status(200).json(applications[0])
        else
            res.status(200).json(applications);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving applications" });
    }

}