import React from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components';

import badCatLottie from '@/assets/lottie/bad-cat-lottie.json';

interface INotFoundByFilterProps {
  text: string;
}

export const NotFoundByFilter = ({text}: INotFoundByFilterProps) => {
  const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0 auto;
  `;

  const Paragraph = styled.div`
    text-align: center;
    margin: 0 auto;
  `;
  
  return (
    <Container>
      <Paragraph>{text}</Paragraph>
      <Lottie
      animationData={badCatLottie}
      style={{width: '60px', height: '60px'}}
      loop={true}
      />
    </Container>
  )
}
