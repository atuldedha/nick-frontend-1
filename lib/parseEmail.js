const { simpleParser } = require('mailparser');
const fs = require('fs')
const path = require('path');
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



function sanitizeFilename(filename) {
    // Replace reserved characters with an underscore (_)
    const reservedCharacters = /[<>:"/\\|?*]/g;
    const sanitizedFilename = filename.replace(reservedCharacters, '_');

    // Truncate the filename to a reasonable length, e.g., 200 characters
    const maxLength = 200;
    return sanitizedFilename.slice(0, maxLength);
}

function getResourceType(contentType) {
    const type = contentType.split('/')[0];
    switch (type) {
        case 'image':
        case 'video':
            return type;
        default:
            return 'raw';
    }
}


module.exports = async function parseEmail(emailStr) {
    try {
        // const mailObject = await simpleParser(emailStr);


        // const messageId = mailObject.headers.get('message-id');
        // const attachments = mailObject.attachments;
        // const attachmentInfos = [];


        // // Create the 'public/attachments' directory if it does not exist

        // const attachmentsDir = path.join(process.cwd(), 'public', 'attachments');
        // if (!fs.existsSync(attachmentsDir)) {
        //     fs.mkdirSync(attachmentsDir, { recursive: true });
        // }


        // attachments.forEach((attachment, index) => {

        //     let filename= attachment.filename.split('.').slice(0, -1).join('.');
        //     let ext= attachment.filename.split('.').slice(-1)[0]
        //     const fileName = sanitizeFilename(`attachment_${messageId}_${index}_${filename}`)+`.${ext}`;
        //     const filePath = path.join(process.cwd(), 'public', 'attachments', fileName);

        //     if (!fs.existsSync(filePath)) {
        //         fs.writeFileSync(filePath, attachment.content);
        //     }

        //     const attachmentURL = `/api/mails/attachments/${fileName}`;
        //     attachmentInfos.push({ url: attachmentURL, filename: attachment.filename });
        // });


        const mailObject = await simpleParser(emailStr);

        const messageId = mailObject.headers.get('message-id');
        const attachments = mailObject.attachments;
        const attachmentInfos = [];

        for (const attachment of attachments) {
            let filename = attachment.filename.split('.').slice(0, -1).join('.');
            let ext = attachment.filename.split('.').slice(-1)[0];
            const fileName = sanitizeFilename(`attachment_${messageId}_${filename}`) + `.${ext}`;

            let fileExists = true;

            try {
                // Check if the attachment already exists on Cloudinary using the "attachment" tag
                const existingFiles = await cloudinary.v2.api.resources_by_tag("attachment", {
                    public_id: fileName.split(".").slice(0, -1).join("."),
                });


                const existing = existingFiles.resources.find(
                    (resource) => resource.public_id === fileName.split(".").slice(0, -1).join(".")
                );

                if (existing) {
                    attachmentInfos.push({ url: existing.secure_url, filename: attachment.filename });
                } else {
                    fileExists = false;
                }
            } catch (error) {
                if (error.error.http_code !== 404) throw error;
                else fileExists = false;
            }


            if (!fileExists) {
                console.log("uploading attachment to cloudinary");

                // Determine the resource type based on the content type of the attachment
                const resourceType = getResourceType(attachment.contentType);

                // Upload the attachment to Cloudinary
                const result = await cloudinary.v2.uploader.upload(
                    `data:${attachment.contentType};base64,${attachment.content.toString("base64")}`,
                    {
                        public_id: fileName.split(".").slice(0, -1).join("."),
                        tags: ["attachment"],
                        resource_type: resourceType,
                    }
                );
                attachmentInfos.push({ url: result.secure_url, filename: attachment.filename });
            }
        }






        const email = {
            attachments: attachmentInfos,
            headers: mailObject.headers,
            replyId: messageId,
            date: mailObject.date,
            subject: mailObject.subject || '',
            to: mailObject.to?.value[0],
            from: mailObject.from?.value[0],
            text: mailObject.text,
            html: mailObject.html
        };

        if (!email.to)
            email.to = {
                name: "",
                email: ""
            }

        if (!email.to.name)
            email.to.name = ""


        if (!email.from)
            email.from = {
                name: "",
                email: ""
            }

        if (!email.from.name)
            email.from.name = ""

        return email;
    } catch (error) {
        // cloudinary attachment not already uploaded error
        if (error.error && error.error.http_code === 404)
            return;

        console.error('Error parsing email:', error);
        throw error;
    }
}