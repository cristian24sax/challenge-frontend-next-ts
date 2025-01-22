'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

import useLogin from '@/hooks/useLogin';
import useLoginForm from '@/hooks/useLoginForm';

const Login = () => {
  const router = useRouter();
  const [submit, setSubmit] = useState(false);

  const formik = useLoginForm(() => {
    setSubmit(true);
  });

  const login = useLogin(
    formik.values.email,
    formik.isValid,
    !!formik.touched.email
  );

  useEffect(() => {
    if (login.accountId && submit) {
      Cookies.set('accountId', login.accountId, { expires: 1 });
      localStorage.setItem('accountId', login.accountId);
      localStorage.setItem('userName', login.userName as string);

      router.push('/session/home');
    }
  }, [login.accountId, router, submit, login.userName]);

  return (
    // se considero que el login solo sea con el email
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-100">
      <div className="rounded text-white bg-black flex flex-col p-6">
        <h1 className="text-lg font-bold mb-4">Login</h1>
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="text-sm mb-1">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="bg-gray-500 p-2 rounded"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {/* Validación del email */}
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-500 text-sm">
                {formik.errors.email}
              </span>
            )}
          </div>
          {/* Mensaje de error si el correo no existe */}
          {login.errorMessage && (
            <div className="text-red-500 text-sm mb-4">
              {login.errorMessage}
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
            disabled={!formik.isValid || login.isLoadingAccount}
          >
            {login.isLoadingAccount ? 'Cargando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
