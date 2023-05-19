import formidable from 'formidable';
import gmailClient from '../../../lib/gmailClient';
import createRawEmail from '../../../lib/createRawEmail';
import validateToken from '../../../lib/validateToken';
import isSysOp from '../../../utils/isSysOp';
import parseEmail from '../../../lib/parseEmail';
import fs from 'fs';
const { convert } = require('html-to-text');



export default async (req, res) => {
    const gmail = await gmailClient();
    if (req.method !== 'POST')
        return res.status(405).json({ error: 'Method not allowed' });

    // let reqToken = req.headers['Authorization'] || req.headers['authorization']

    // let validToken = false;
    // if (reqToken) {
    //     reqToken = reqToken.split(' ').filter(s => s).slice(-1)[0]
    //     validToken = validateToken(reqToken)
    // }
    // if (!validToken)
    //     return res.status(400).json({
    //         error: "Invalid Token"
    //     })
    // if (
    //     !isSysOp(validToken.role)
    // )
    //     return res.status(400).json({
    //         error: "Only system operator can send emails"
    //     })

    const form = new formidable.IncomingForm();


    form.parse(req, async (err, fields, files) => {
        if (err) {
            res.status(400).json({ error: 'Error parsing form data' });
            return;
        }

        let { to, message, subject, inReplyTo, threadId, isForwarding } = fields;
        if (inReplyTo == "undefined")
            inReplyTo = undefined;

        console.log("send options are ", fields)

        // Create the email
        const emailData = {
            to: to,
            subject: subject,
            text: message,
            inReplyTo,
            attachments: [],
            isForwarding
        };

        Object.values(files).forEach(file => {
            // Read the file and convert it to base64
            const fileData = fs.readFileSync(file.path, { encoding: 'base64' });
            emailData.attachments.push({
                filename: file.name,
                mimeType: file.type,
                data: fileData,
            })
        })
        const rawEmail = createRawEmail(emailData);

        const requestBody = {
            raw: rawEmail,
        }
        if (threadId && threadId != 'undefined')
            requestBody.threadId = threadId

        // Send the email
        try {
            const response = await gmail.users.messages.send({
                userId: 'me',
                requestBody
            });

            const messageId = response.data.id;

            // Fetch raw email content of the sent message using messageId
            const messageResponse = await gmail.users.messages.get({
                userId: "me",
                id: messageId,
                format: "raw"
            });

            const rawEmail = messageResponse.data.raw;
            const buff = Buffer.from(rawEmail, 'base64');
            const emailStr = buff.toString('utf-8');
            const parsedEmail = await parseEmail(emailStr);


            const email = {
                id: messageId,
                threadId: response.data.threadId,
                date: new Date(Number(messageResponse.data.internalDate)),
                attachments: parsedEmail.attachments,
                replyId: parsedEmail.replyId,
                subject: parsedEmail.subject,
                to: parsedEmail.to,
                from: parsedEmail.from,
                messageBody: parsedEmail.text,
                messageBodyHTML: parsedEmail.html
            };


            if (!email.messageBodyHTML)
                email.messageBodyHTML = email.messageBody

            if (!email.messageBody)
                email.messageBody = convert(email.messageBodyHTML)

            
            email.name = email.to.name;
            email.email = email.to.address;
            email.to= email.to.address;
            delete email.from
            


            res.status(200).json(email);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Error sending email' });
        }
    });

};


export const config = {
    api: {
        bodyParser: false,
    },
};
