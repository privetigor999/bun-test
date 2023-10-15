export const navList: INavItem[] = [
  {
    id: 'main',
    path: '/',
    title: 'Главная'
  },
  {
    id: 'add movie',
    path: null,
    title: 'Добавить фильм'
  }
];

interface INavItem {
  id: string;
  path: string | null;
  title: string;
};