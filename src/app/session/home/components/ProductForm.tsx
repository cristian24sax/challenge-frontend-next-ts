import React from 'react';
import { FormikProps } from 'formik';

interface ProductFormProps {
  formik: FormikProps<{ name: string; sku: string }>;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ formik, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formik.isValid) {
      formik.handleSubmit();
      onClose();
    }
  };
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Agregar Producto</h2>
      <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Nombre del Producto:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <span className="text-red-500 text-sm">{formik.errors.name}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="sku">
            SKU:
          </label>
          <input
            id="sku"
            name="sku"
            type="text"
            className="w-full border rounded px-3 py-2"
            value={formik.values.sku}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.sku && formik.errors.sku && (
            <span className="text-red-500 text-sm">{formik.errors.sku}</span>
          )}
        </div>

        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all"
        >
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
