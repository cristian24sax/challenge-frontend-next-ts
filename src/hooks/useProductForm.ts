import { useFormik } from 'formik';
import * as Yup from 'yup';

const ProductsSchema = Yup.object().shape({
  name: Yup.string().required('El nombre del producto es obligatorio.'),
  sku: Yup.string().required('El SKU es obligatorio.'),
});

const useProductForm = (
  onSubmit: (product: { name: string; sku: string }) => void
) => {
  const formik = useFormik({
    initialValues: { name: '', sku: '' },
    validationSchema: ProductsSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  return formik;
};

export default useProductForm;
