export const getMessageTime = (date: string) => {
  const dateOfMessage = new Date(date);

  return dateOfMessage.toLocaleString('ru', {
    hour: 'numeric',
    minute: 'numeric',
  });
};
