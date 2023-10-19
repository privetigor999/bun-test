import React from 'react'
import styled from 'styled-components';
import { Spin } from 'antd';

export const Loader = () => {
  const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  `;

  return (
    <Container>
      <Spin />
    </Container>
  );
};
