const Imap= require("imap")



let imap = null;
let connecting=false;

function imapConnect() {
    return new Promise((resolve, reject) => {
        if (
            imap && 
            !imap.destroyed &&
            imap.state.toLowerCase()=="authenticated"
        ) {
            // Connection is already authenticated, return cached instance
            resolve(imap);
            return;
        }

        if(connecting){
            imap.once('ready', () => {
                connecting=false;
                resolve(imap);
            });

            return;
        }

        console.log("CONNECTING TO IMAP SERVER")
        connecting=true;
        imap = new Imap({
            user: process.env.IMAP_GMAIL,
            password: process.env.IMAP_APP_PASSWORD,
            host: 'imap.gmail.com',
            port: 993,
            tls: true,
            connTimeout: 50000 ,
            authTimeout: 50000,
            tlsOptions: { rejectUnauthorized: false }
        });

        imap.once('ready', () => {
            connecting=false;
            resolve(imap);
        });

        imap.once('error', (err) => {
            reject(err);
        });

        imap.connect();
    });
}
export default imapConnect;