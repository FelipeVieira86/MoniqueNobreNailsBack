import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  login: Yup.string().required(),
  password: Yup.string().required(),
  admin: Yup.boolean().required(),
});
