const { google } = require('googleapis');
const { OAuth2 } = google.auth;


let  gmail = null
function gmailClient() {
    if (gmail)
        return gmail;

    const oauth2Client = new OAuth2(
        process.env.GMAIL_CLIENT_ID,
        process.env.GMAIL_CLIENT_SECRET
    );
    oauth2Client.setCredentials({
        access_token: process.env.GMAIL_ACCESS_TOKEN,
        refresh_token: process.env.GMAIL_REFRESH_TOKEN
    });
    gmail= google.gmail({ version: 'v1', auth: oauth2Client });
    return gmail
}

module.exports= gmailClient;