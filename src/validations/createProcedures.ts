import * as Yup from 'yup';

export default Yup.object().shape({
  day: Yup.string().required(),
  type: Yup.string().required(),
  value: Yup.string().required(),
  method: Yup.string().required(),
  client: Yup.number().required(),
});
