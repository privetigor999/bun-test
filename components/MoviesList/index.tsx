'use client';
import { db } from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Row } from 'antd';
import { MovieItem } from './MovieItem';
import type { IMovie } from '@/interface/movie';

export const MoviesList = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  const fetchMovies = async () => {
    const moviesRef = collection(db, 'movies');
    const querySnapshot = await getDocs(moviesRef);
    const moviesData: IMovie[] = [];

    querySnapshot.forEach((doc) => {
      const movie = doc.data() as IMovie;
      moviesData.push(movie);
    });

    setMovies(moviesData);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Row gutter={[16, 16]} style={{width: '100%', padding: '0 30px', margin: '20px 0'}}>
      {
        movies?.map(movie => (
          <MovieItem movie={movie} key={movie.id}/>
        ))
      }
    </Row>
  )
};
