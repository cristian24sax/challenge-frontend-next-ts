import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('¡Correo inválido!').required('¡Campo requerido!'),
});

const useLoginForm = (onSubmit: (email: string) => void) => {
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: LoginSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      onSubmit(values.email);
    },
  });

  return formik;
};

export default useLoginForm;
