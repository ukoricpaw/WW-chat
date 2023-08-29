export function checkIsLoginAndReturnTitleString(isLogin: boolean) {
  const authInfo = {
    title: isLogin ? 'Войти в систему' : 'Зарегистрироваться',
    questionAboutAcc: isLogin ? 'Нет аккаунта? ' : 'Есть аккаунт? ',
    linkToAnotherPage: isLogin ? 'Создать аккаунт' : 'Войти в аккаунт',
    url: isLogin ? 'registration' : 'login',
  };
  return authInfo;
}
