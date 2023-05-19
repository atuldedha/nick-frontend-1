import jwt from 'jsonwebtoken';
import validateToken from '../../../lib/validateToken';

const SECRET_KEY = process.env.JWT_SECRET_KEY;
const EXPIRATION_TIME = '1h'; 




const refreshToken = (user) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: EXPIRATION_TIME });
};

export default async function handleRefreshToken(req, res) {
  if (req.method !== 'POST') {
    res.status(400).end();
    return;
  }

  const { token } = req.body;

  if (!token) {
    res.status(400).json({ error: 'Token is required.' });
    return;
  }

  const user = validateToken(token);

  if (!user) {
    res.status(401).json({ error: 'Invalid or expired token.' });
    return;
  }

  const { exp, iat,  ...rest } = user;

  console.log(rest)
  const newToken = refreshToken(rest);
  res.json({ token: newToken });
}
