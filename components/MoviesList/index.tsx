'use client';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useLayoutEffect, useState } from 'react';
import { Row, Flex, Spin } from 'antd';
import { MovieItem } from './MovieItem';
import { FilterMoviePanel } from './FilterMoviePanel';
import { NotFoundByFilter } from './NotFoundByFilter';
import { dbCollection } from '@/data/db';
import { Loader } from './../ui/Loader';

import type { IMovie } from '@/interface/movie';
import { Error } from '../Error';

export const MoviesList = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchMovies = async () => {
    try {
      setError(false);
      setLoading(true);
      
      const moviesRef = collection(db, dbCollection.movies);
      const querySnapshot = await getDocs(moviesRef);
      const moviesData: IMovie[] = [];
  
      querySnapshot.forEach((doc) => {
        const movie = doc.data() as IMovie;
        moviesData.push(movie);
      });
  
      setMovies(moviesData);
      setFilteredMovies(moviesData);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    fetchMovies();
  }, []);

  const showMoviesOrNotFound = () => {
    return filteredMovies.length > 0 ?
      filteredMovies?.map(movie => (
        <MovieItem movie={movie} key={movie.id}/>
      )) :
      <NotFoundByFilter text='Ничего не нашли'/>
  }; 

  return (
    <Flex vertical style={{width: '100%'}}>
      <FilterMoviePanel
        movies={movies}
        setFilteredMovies={setFilteredMovies}
      />
      <Row gutter={[16, 16]} style={{width: '100%', padding: '0 30px', margin: '20px 0'}}>
        {error && <Error />}
        {loading ? <Loader /> : showMoviesOrNotFound()}
      </Row>
    </Flex>
  );
};
