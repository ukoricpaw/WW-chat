export const getNameByEmail = (email: string) => {
  return email.slice(0, email.lastIndexOf('@'));
};
