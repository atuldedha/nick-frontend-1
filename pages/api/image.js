import cloudinary from 'cloudinary';
import formidable from "formidable";
import dbConnect from '../../lib/dbConnect'
import Image from '../../models/image'

export const config = {
    api: {
        bodyParser: false
    }
};

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET': {
            return getAllImages(req, res);
        }

        case 'POST': {
            return addImage(req, res);
        }
    }
}

async function saveImage(req, res, imageUrl) {

    try {
        const image = await Image.create({ imageUrl })
        res.status(201).json({ success: true, data: image })

    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

const addImage = async (req, res) => {
    const form = new formidable.IncomingForm();

    await form.parse(req, (err, fields, files) => {
        cloudinary.v2.uploader
            .upload(files['file'].path)
            .then((result) => {

                saveImage(req, res, result?.url)

            }).catch((error) => {
                res.status(500).send({
                    message: "failure",
                    error,
                });
            });
    });

}

async function getAllImages(req, res) {
    try {
        const images = await Image.find({})
        return res.json({
            images: JSON.parse(JSON.stringify(images)),
            success: true,
        });

    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}
