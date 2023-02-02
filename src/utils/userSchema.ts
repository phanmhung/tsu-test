import * as Yup from 'yup';

export const AddUserSchema = Yup.object().shape({
    avatar: Yup.string().required('Avatar is required'),
  
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Firstname is required'),
  
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Lastname is required'),
    patronymic: Yup.string(),
  
    email: Yup.string().email().required('Email is required'),
    about: Yup.string(),
  });
  