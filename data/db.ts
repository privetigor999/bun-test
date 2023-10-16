export const dbCollection: IDbCollection = {
  movies: 'movies'
};

interface IDbCollection {
  [key: string]: string
}