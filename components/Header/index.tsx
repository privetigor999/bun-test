'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import styled from 'styled-components';
import { signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { ModalWithAddMovie } from './ModalWithAddMovie';
import { routes } from '@/data/routes';
import { auth, provider } from '@/firebase';

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

  const handleClickAuth = () => {
    signInWithPopup(auth, provider).then(user => {
      const user = {
        name: user.user.displayName,
        photo: user.user.photoURL
      }
    })
  }

  return (
    <HeaderContainer>
      <Navigator>
        <DivContainer>
          <Link href={routes.main}>
            <Button style={{marginRight: 20}}>Главная</Button>
          </Link>
          <Button onClick={() => setIsOpenModal(true)}>Добавить фильм</Button>
        </DivContainer>
        <Button onClick={handleClickAuth}>Логин</Button>
      </Navigator>
      <ModalWithAddMovie
        open={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        onCancel={() => setIsOpenModal(false)}
      />
    </HeaderContainer>
  );
};
