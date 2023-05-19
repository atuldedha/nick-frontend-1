const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const days = process.env.EXPIRE_AFTER_DAYS

const ImageSchema = new Schema({
    imageUrl: String,
    expireAt: {
        type: Date,
        default: new Date(new Date().valueOf() + (60 * 60 * 24 * 1000 * days)),
        expires: 60
    }
});


const imagesDB = mongoose.connection.useDb(process.env.IMAGES_DB_NAME);

module.exports = imagesDB.Image || imagesDB.model('Image', ImageSchema);