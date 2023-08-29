import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupStore } from './store';
import Router from './Router';
import './styles/globals.scss';
import { useAppDispatch } from './hooks/reduxHooks';
import refreshToken from './store/thunks/refreshToken';

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    dispatch(refreshToken())
      .then(data => {
        if (typeof data === 'string') {
          navigate('/chat');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <></>;
  }

  const store = setupStore();

  return (
    <main className="container">
      <section className="container__ownWrapper">
        <Router />
      </section>
    </main>
  );
};

export default App;
