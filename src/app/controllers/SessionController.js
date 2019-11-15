import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required()
    });

    const { body } = req;

    const isValid = await schema.isValid(body);
    if (!isValid) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { email, password } = body;

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
