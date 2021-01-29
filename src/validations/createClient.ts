import * as Yup from 'yup';

export default Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required().email(),
  phone: Yup.string().required(),
  birthdate: Yup.string().required(),
  procedures: Yup.array(),
});
