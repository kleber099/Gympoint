import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const { body } = req;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .integer()
        .required(),
      weight: Yup.number()
        .positive()
        .required(),
      height: Yup.number()
        .positive()
        .required()
    });

    const isValid = await schema.isValid(body);
    if (!isValid) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const studentExist = await Student.findOne({
      where: { email: body.email }
    });
    if (studentExist) {
      return res.status(401).json({ error: 'Student already exists.' });
    }

    const student = await Student.create(body);

    return res.json(student);
  }

  async update(req, res) {
    const { body, params } = req;

    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .integer(),
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number()
        .positive()
        .integer(),
      weight: Yup.number().positive(),
      height: Yup.number().positive()
    });

    const isValid = await schema.isValid(body);
    if (!isValid) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    let student = await Student.findByPk(params.id);
    if (!student) {
      return res.status(401).json({ error: 'Student not exists' });
    }

    const { email } = body;
    if (email && email !== student.email) {
      const studentExist = await Student.findOne({ where: { email } });

      if (studentExist) {
        return res.status(401).json({ error: 'Student already exists' });
      }
    }

    student = await student.update(body);

    return res.json(student);
  }
}

export default new StudentController();
