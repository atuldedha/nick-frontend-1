import gmailClient from '../../../lib/gmailClient';
import parseEmail from '../../../lib/parseEmail';
import validateToken from '../../../lib/validateToken';
import isSysOp from '../../../utils/isSysOp';
const { convert } = require('html-to-text');

const pageTokensCache = {};

const fetchEmails = async (gmail, maxResults, page, box) => {
  let emails = [];

  if (!pageTokensCache[box]) {
    pageTokensCache[box] = {};
  }

  let nextPageToken = pageTokensCache[box][page - 1] || null;

  if (!nextPageToken && page > 1) {
    // Fetch and cache all previous page tokens if not cached
    for (let i = 1; i < page; i++) {
      const response = await gmail.users.messages.list({
        userId: 'me',
        labelIds: [box],
        maxResults,
        ...(pageTokensCache[box][i - 1] && { pageToken: pageTokensCache[box][i - 1] }),
      });

      nextPageToken = response.data.nextPageToken;
      pageTokensCache[box][i] = nextPageToken;
    }
  }

  const response = await gmail.users.messages.list({
    userId: 'me',
    maxResults,
    labelIds: [box],
    ...(nextPageToken && { pageToken: nextPageToken }),
  });

  pageTokensCache[box][page] = response.data.nextPageToken;

  let messages = response.data.messages;

  if (!response.data.messages) console.log(response.data);

  for (let i = 0; i < messages.length; ++i) {
    const message = messages[i];

    const msgRes = await gmail.users.messages.get({
      userId: 'me',
      id: message.id,
      format: 'raw'
    });

    const rawEmail = msgRes.data.raw

    const buff = Buffer.from(rawEmail, 'base64');
    const emailStr = buff.toString('utf-8');
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
      messageBodyHTML: parsedEmail.html
    };

    if (!email.messageBodyHTML)
      email.messageBodyHTML = email.messageBody

    if (!email.messageBody)
      email.messageBody = convert(email.messageBodyHTML)

    if (box == "INBOX") {
      email.name = email.from.name;
      email.from = email.from.address
      delete email.to;
    } else if (box == "SENT") {
      email.name = email.to.name;
      email.email = email.to.address;
      email.to = email.to.address;
      delete email.from
    }

    emails.push(email)
  }

  return emails;
};

const getLabelIds = async (gmail) => {
  const response = await gmail.users.labels.list({
    userId: 'me',
  });

  const labels = response.data.labels;
  return labels.map(label => ({ id: label.id, name: label.name }));
};

export default async function (req, res) {
  let { page, perPage, box } = req.query;

  page= Number(page)
  perPage= Number(perPage)
  if (!box) box = "INBOX";
  if (!page) page = 1;
  if (!perPage) perPage = 10;

  let reqToken = req.headers['Authorization'] || req.headers['authorization'];

  let validToken = false;
  if (reqToken) {
    reqToken = reqToken.split(' ').filter(s => s).slice(-1)[0];
    validToken = validateToken(reqToken);
  }
  if (!validToken)
    return res.status(400).json({
      error: "Invalid Token"
    });
  if (
    !isSysOp(validToken.role)
  )
    return res.status(400).json({
      error: "Only system operator can read emails"
    });

  const gmail = await gmailClient();

  console.log("Fetching emails from " + box + " page " + page + " perPage " + perPage)
  fetchEmails(gmail, perPage, page, box).then(function (emails) {
    res.json(emails);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: "An error occurred while fetching emails"
    });
  });
}