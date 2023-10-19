'use client';
import React from 'react';
import { Flex, notification } from 'antd';
import styled from 'styled-components';
import { join } from 'lodash';
import { Rating } from '../ui/Rating';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { dbCollection } from '@/data/db';
import { calculateNewRating } from './helpers/calculateNewRating';

import type { IMovie } from '@/interface/movie';
import { Comments } from './Comments';

interface IMovieFullPageProps {
  movie: IMovie
}
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  flex-grow: 1;
  max-width: 220px;
  align-items: initial;
  height: 300px;
  margin: 0 auto;
  object-fit: contain;
  border-radius: 6px;
  overflow: hidden;
  @media (min-width: 768px) {
    width: 50%;
    margin-bottom: 20px;
    margin-right: 30px;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 768px) {
    flex-grow: 1;
    width: 50%;
  }
`;

const Title = styled.h1`
  margin-bottom: 6px;
`;

const Field = styled.p`
  font-weight: 500;
  margin-bottom: 4px;
  span {
    font-weight: 400;
    color: #c2c2c2;
  }
`;

const Description = styled.p`
  margin-bottom: 6px;
`;

export const MovieFullPage = ({movie}: IMovieFullPageProps) => {
  const actors = join(movie.actors, ', ');
  const [api, contextHolder] = notification.useNotification();

  const handleClickRate = async (userUpdateRate: number) => {
    const endpoint = movie.transliterate;

    const newMiddleRating = calculateNewRating(movie.rate, movie.countRate, userUpdateRate);

    try {
      await updateDoc(doc(db, dbCollection.movies, endpoint), {
        countRate: movie.countRate + 1,
        rate: newMiddleRating
      })
      
      api.success({
        message: 'Ваш рейтинг отправлен!',
        description: 'Он будет добавлен в течении нескольких секунд',
        placement: 'topRight'
      })
    } catch (error) {
      api.error({
        message: 'Произошла ошибка!',
        description: 'Попробуйте оставить рейтинг позже',
        placement: 'topRight'
      })
    }
  }

  return (
    <>
      <MainContainer style={{width: '100%'}}>
        {contextHolder}
        <ImageContainer>
          <img src={movie.poster} style={{objectFit: 'contain', width: '100%'}} alt={movie.title}/>
        </ImageContainer>
        <InfoContainer>
          <Title>{movie.title}</Title>
          <Rating onChange={handleClickRate} style={{margin: '4px 0 8px 0'}} rate={movie.rate}/>
          <Field>Год выхода: <span>{movie.year}</span></Field>
          <Description>{movie.description}</Description>
          <Flex>
            <Field>Главные актеры: <span>{actors}</span></Field>
          </Flex>
        </InfoContainer>
      </MainContainer>
      <Comments comments={movie.comments} transliterate={movie.transliterate}/>
    </>
  );
};
