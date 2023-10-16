import React from 'react';
import Lottie from 'lottie-react';
import styled from 'styled-components';

import badCatLottie from '@/assets/lottie/bad-cat-lottie.json';

export const NotFoundByFilter = () => {
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
      <Paragraph>Ничего не нашли</Paragraph>
      <Lottie
      animationData={badCatLottie}
      style={{width: '60px', height: '60px'}}
      loop={true}
      />
    </Container>
  )
}
