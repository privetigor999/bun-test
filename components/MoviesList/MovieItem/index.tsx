import React from 'react';
import Image from 'next/image';
import { Col } from 'antd';
import styled from 'styled-components';

import type { IMovie } from '@/interface/movie';

interface IMovieItem {
  movie: IMovie;
}

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 220px;
  height: 300px;
  margin: 0 auto;
  object-fit: contain;
  border-radius: 6px;
  overflow: hidden;
  @media (min-width: 375px) {
    margin-bottom: 20px;
  }
`;

const FilmInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  overflow: hidden;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  margin-bottom: 6px;
  text-align: center;
`;

const Description = styled.p`
  overflow: hidden;
  max-width: 300px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
          line-clamp: 3;
  -webkit-box-orient: vertical;
  text-align: center;
  @media (min-width: 375px) {
    max-width: inherit;
  }
`;

export const MovieItem = ({movie}: IMovieItem) => {
  return (
    <Col xs={24} sm={12} md={8} lg={8} xl={8} style={{cursor: 'pointer', marginBottom: '18px'}}>
      <ImageContainer>
        <Image src={movie.poster} fill alt={movie.title}/>
      </ImageContainer>
      <FilmInfoContainer>
        <Title>{movie.title}</Title>
        <Description>{movie.description}</Description>
      </FilmInfoContainer>
    </Col>
  )
}
