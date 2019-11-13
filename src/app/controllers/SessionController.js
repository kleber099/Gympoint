import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'User not found' });
    }

    const passwordValid = await user.checkPassword(password);
    if (!passwordValid) {
      res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = user;

    const { secret, expiresIn } = authConfig;
    const token = jwt.sign({ id }, secret, { expiresIn });

    return res.json({ user: { id, name, email }, token });
  }
}

export default new SessionController();
