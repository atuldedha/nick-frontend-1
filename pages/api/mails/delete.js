import gmailClient from '../../../lib/gmailClient';
import validateToken from '../../../lib/validateToken';
import isSysOp from '../../../utils/isSysOp';


async function deleteMail(gmail, messageId) {
  await gmail.users.messages.trash({
    userId: 'me',
    id: messageId,
  });
}

export default async (req, res) => {
  let reqToken = req.headers['Authorization'] || req.headers['authorization'];

  let validToken = false;
  if (reqToken) {
    reqToken = reqToken.split(' ').filter((s) => s).slice(-1)[0];
    validToken = validateToken(reqToken);
  }
  if (!validToken)
    return res.status(400).json({
      error: 'Invalid Token',
    });
  if (!isSysOp(validToken.role))
    return res.status(400).json({
      error: 'Only system operator can delete emails.',
    })

  const { ids } = req.body;

  try {
    const gmail = await  gmailClient();
    for (let i = 0; i < ids.length; ++i) {
      const messageId = ids[i];

      await deleteMail(gmail, messageId);
    }

    return res.json({
      success: true,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).end();
  }
};
