export const formatDate = (timestamp: string): string => {
  const newDate = new Date(timestamp);

  const options: IOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };

  const formattedDate = newDate.toLocaleDateString('ru-RU', options);

  return formattedDate;
};

interface IOptions {
  [key: string]: string;
}