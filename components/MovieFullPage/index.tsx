'use client';
import React from 'react';
import Image from 'next/image';
import { Flex, Space } from 'antd';
import styled from 'styled-components';

import type { IMovie } from '@/interface/movie';
import { join } from 'lodash';

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
  @media (min-width: 375px) {
    width: 50%;
    margin-bottom: 20px;
    margin-right: 30px;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 375px) {
    flex-direction: row;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 375px) {
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

  return (
    <MainContainer style={{width: '100%'}}>
      <ImageContainer>
        <img src={movie.poster} style={{objectFit: 'contain', width: '100%'}} alt={movie.title}/>
      </ImageContainer>
      <InfoContainer>
        <Title>{movie.title}</Title>
        <Field>Год выхода: <span>{movie.year}</span></Field>
        <Description>{movie.description}</Description>
        <Flex>
          <Field>Главные актеры: <span>{actors}</span></Field>
        </Flex>
      </InfoContainer>
    </MainContainer>
  );
};
