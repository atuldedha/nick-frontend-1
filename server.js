// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");
const gmailClient = require("./lib/gmailClient");
const parseEmail = require("./lib/parseEmail");
const { convert } = require("html-to-text");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const gmailPollTime = 2000;

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server);

  checkNewMessages("INBOX", io);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  server.listen(3000, () => {
    console.log("Next.js and Socket.IO server listening on port 3000");
  });
});

let lastMessageTimes = {
  INBOX: new Date(Date.now()),
  SENT: new Date(Date.now()),
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

async function checkNewMessages(box, io) {
  const gmail = gmailClient();

  let yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const res = await gmail.users.messages.list({
    userId: "me",
    labelIds: [box],
    q: `after:${formatDate(yesterdayDate)}`,
  });

  const messages = res.data.messages;

  if (messages.length > 0) {
    for (let i = 0; i < messages.length; ++i) {
      const message = messages[i];

      const msgRes = await gmail.users.messages.get({
        userId: "me",
        id: message.id,
        format: "raw",
      });

      const rawEmail = msgRes.data.raw;
      const buff = Buffer.from(rawEmail, "base64");
      const emailStr = buff.toString("utf-8");
      const parsedEmail = await parseEmail(emailStr);

      const email = {
        id: message.id,
        threadId: message.threadId,
        date: new Date(Number(msgRes.data.internalDate)),
        attachments: parsedEmail.attachments,
        replyId: parsedEmail.replyId,
        subject: parsedEmail.subject,
        to: parsedEmail.to,
        from: parsedEmail.from,
        messageBody: parsedEmail.text,
        messageBodyHTML: parsedEmail.html,
        box,
      };
      if (lastMessageTimes[box].getTime() >= email.date.getTime()) break;

      lastMessageTimes[box] = email.date;

      if (!email.messageBodyHTML) email.messageBodyHTML = email.messageBody;

      if (!email.messageBody)
        email.messageBody = convert(email.messageBodyHTML);

      if (box == "INBOX") {
        email.name = email.from.name;
        email.from = email.from.address;
        delete email.to;
      }

      if (box == "SENT") {
        email.name = email.to.name;
        email.email = email.to.address;
        email.to = email.to.address;
        delete email.from;
      }

      io.emit("new-email", email);
    }
  }

  setTimeout(() => {
    try {
      checkNewMessages(box, io);
    } catch (err) {
      console.log(err.message);
    }
  }, gmailPollTime);
}
