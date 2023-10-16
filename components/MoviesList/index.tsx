'use client';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Row, Flex } from 'antd';
import { MovieItem } from './MovieItem';
import { FilterMoviePanel } from './FilterMoviePanel';
import { NotFoundByFilter } from './NotFoundByFilter';
import { dbCollection } from '@/data/db';

import type { IMovie } from '@/interface/movie';

export const MoviesList = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);

  const fetchMovies = async () => {
    const moviesRef = collection(db, dbCollection.movies);
    const querySnapshot = await getDocs(moviesRef);
    const moviesData: IMovie[] = [];

    querySnapshot.forEach((doc) => {
      const movie = doc.data() as IMovie;
      moviesData.push(movie);
    });

    setMovies(moviesData);
    setFilteredMovies(moviesData);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Flex vertical style={{width: '100%'}}>
      <FilterMoviePanel
        movies={movies}
        filteredMovies={filteredMovies}
        setFilteredMovies={setFilteredMovies}
      />
      <Row gutter={[16, 16]} style={{width: '100%', padding: '0 30px', margin: '20px 0'}}>
        {
          filteredMovies.length > 0 ? (
            filteredMovies?.map(movie => (
              <MovieItem movie={movie} key={movie.id}/>
            ))
          ) : (
            <NotFoundByFilter />
          )
        }
      </Row>
    </Flex>
  );
};
