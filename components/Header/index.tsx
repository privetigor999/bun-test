'use client';
import { useState } from 'react';
import { Button } from 'antd';
import styled from 'styled-components';

import { ModalWithAddMovie } from './ModalWithAddMovie';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 30px;
  background-color: #1677ff;
`;

const Navigator = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: inherit;
`;

const DivContainer = styled.div`
  display: flex;
  align-items: center;
`
export const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <HeaderContainer>
      <Navigator>
        <DivContainer>
          <Button style={{marginRight: 20}}>Главная</Button>
          <Button onClick={() => setIsOpenModal(true)}>Добавить фильм</Button>
        </DivContainer>
        <Button>Логин</Button>
      </Navigator>
      <ModalWithAddMovie
        open={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        onCancel={() => setIsOpenModal(false)}
      />
    </HeaderContainer>
  );
};
