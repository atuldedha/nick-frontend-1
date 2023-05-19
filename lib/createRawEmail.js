import { v4 as uuidv4 } from 'uuid';

export default function createRawEmail({
  to,
  subject,
  text,
  attachments,
  inReplyTo,
  isForwarding,
}) {
  const boundary = uuidv4();

  const emailLines = [];

  emailLines.push(`From: "Montreal Canada Parade" <me>`);
  emailLines.push(`To: ${to}`);
  emailLines.push(`Content-Type: multipart/mixed; boundary="${boundary}"`);

  if (inReplyTo) {
    emailLines.push(`Subject: Re: ${subject}`);
    emailLines.push(`In-Reply-To: ${inReplyTo}`);
    emailLines.push(`References: ${inReplyTo}`);
  } else if (isForwarding) {
    emailLines.push(`Subject: Fwd: ${subject}`);
  } else {
    emailLines.push(`Subject: ${subject}`);
  }

  emailLines.push('');
  emailLines.push('--' + boundary);
  emailLines.push('Content-Type: text/plain; charset="UTF-8"');
  emailLines.push(`Content-Transfer-Encoding: base64`);
  emailLines.push('');
  emailLines.push(Buffer.from(text).toString('base64'));

  attachments.forEach((attachment) => {
    emailLines.push('--' + boundary);
    emailLines.push(`Content-Type: ${attachment.mimeType}`);
    emailLines.push('Content-Transfer-Encoding: base64');
    emailLines.push(`Content-Disposition: attachment; filename="${attachment.filename}"`);
    emailLines.push('');
    emailLines.push(attachment.data);
  });

  emailLines.push('--' + boundary + '--');

  return Buffer.from(emailLines.join('\n')).toString('base64').replace(/\+/g, '-').replace(/\//g, '_');
}
