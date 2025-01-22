import { useAccounts } from '@/api/graphql/hooks/useAccount';
import { useEffect, useState } from 'react';

const useLogin = (email: string, isValid: boolean, touched: boolean) => {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoadingAccount, setIsLoadingAccount] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const validEmail = isValid && email && touched;

  const { data, loading, error } = useAccounts(validEmail ? email : '');

  useEffect(() => {
    setIsLoadingAccount(true);
    if (!loading && data && validEmail) {
      const account = data.accounts[0];
      if (account) {
        setAccountId(account._id);
        setUserName(account.name);
        setErrorMessage(null);
      } else {
        setAccountId(null);
        setUserName(null);
        setErrorMessage(
          'No se encontró ninguna cuenta con el correo proporcionado.'
        );
      }
    }

    if (error) {
      setAccountId(null);
      setUserName(null);
      setErrorMessage('Ocurrió un error al buscar la cuenta.');
    }

    setIsLoadingAccount(false);
  }, [data, loading, error, validEmail]);

  return {
    accountId,
    userName,
    isLoadingAccount,
    errorMessage,
    loading,
  };
};

export default useLogin;
