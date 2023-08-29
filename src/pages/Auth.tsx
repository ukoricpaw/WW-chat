'use client';

import { FC, MouseEvent, useEffect } from 'react';
import { Input } from '../components/UIComponents/Input';
import { Button } from '../components/UIComponents/Button';
import useFormFields from '../hooks/useFormFields';
import styles from '../styles/Form.module.scss';
import { useAppDispatch } from '../hooks/reduxHooks';
import { useAppSelector } from '../hooks/reduxHooks';
import { fetchUserThunk } from '../store/thunks/fetchUserThunk';
import { Container } from '../components/UIComponents/Container';
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { checkIsLoginAndReturnTitleString } from '../utils/checkIsLoginAndReturnTitleString';
import { useNavigate, useLocation } from 'react-router-dom';
import { returnErrorToNull } from '../store/slices/userSlice';

export const Auth: FC = () => {
  const location = useLocation();

  const isLogin = location.pathname === '/login' ?? false;

  const authInfo = checkIsLoginAndReturnTitleString(isLogin);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isError, isLoading } = useAppSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(returnErrorToNull());
  }, [isLogin]);

  const [state, setState] = useFormFields({ email: '', password: '' });
  const setEmail = setState('email');
  const setPassword = setState('password');
  const submitAuthForm = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const authBody = {
      ...state,
      isLogin,
    };
    dispatch(fetchUserThunk(authBody)).then(data => {
      if (typeof data === 'string') {
        navigate('/');
      }
    });
  };
  return (
    <form className={styles.authform}>
      <Container variant={'success'} gap={30}>
        <legend className={styles.authform__title}>{authInfo.title}</legend>
        <Container variant={'success'} gap={15}>
          <Input placeholder="Введите email" variant={'light'} value={state.email} onChange={setEmail} type="email">
            <AiOutlineMail size={15} />
          </Input>
          <Input
            placeholder="Введите пароль"
            variant={'light'}
            value={state.password}
            onChange={setPassword}
            type="password"
          >
            <AiOutlineLock size={15} />
          </Input>
          <span style={{ color: 'red', height: '20px' }}>{isError && isError}</span>
        </Container>
        <p>
          {authInfo.questionAboutAcc}
          <Link to={`/${authInfo.url}`}>{authInfo.linkToAnotherPage}</Link>
        </p>
        <Container variant={'success'} gap={5}>
          <Button disabled={isLoading} onClick={submitAuthForm} variant={'success'}>
            {authInfo.title}
          </Button>
        </Container>
      </Container>
    </form>
  );
};
