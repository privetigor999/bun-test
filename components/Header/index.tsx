'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Button, notification } from 'antd';
import styled, { css } from 'styled-components';
import { signInWithPopup, signOut } from 'firebase/auth';
import { ModalWithAddMovie } from './ModalWithAddMovie';
import { routes } from '@/data/routes';
import { auth, provider } from '@/firebase';
import { $user, setUser } from '@/store/user';
import type { IUser } from '@/interface/user';
import { useStore } from 'effector-react';
import { LoginOutlined } from '@ant-design/icons';

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
  const user = useStore($user);
  const [api, contextHolder] = notification.useNotification();

  const handleClickAuth = () => {
    signInWithPopup(auth, provider).then(googleUser => {
      const user: IUser = {
        name: googleUser.user.displayName!,
        photo: googleUser.user.photoURL!,
        email: googleUser.user.email!
      };
      console.log(googleUser)

      setUser(user);

      api.success({
        message: 'Успешно!',
        description: `Вы авторизованы под именем ${user.name}`,
        placement: 'topRight'
      })
    })
  };
  
  const handleSignOut = () => {
    signOut(auth);

    setUser(null);

    api.success({
      message: 'Успешно!',
      description: `Вы вышли из аккаунта ${user?.email ?? user.email}`,
      placement: 'topRight'
    })
  };

  const ButtonMain = styled.div`
    margin-right: 4px;

    @media (min-width: 375px) {
      margin-right: 20px;
    }
  `;

  return (
    <HeaderContainer>
      <Navigator>
        <DivContainer>
          <ButtonMain>
            <Link href={routes.main}>
              <Button>Главная</Button>
            </Link>
          </ButtonMain>
          <Button onClick={() => setIsOpenModal(true)}>Добавить фильм</Button>
        </DivContainer>
        {
          user ? 
            <Button onClick={handleSignOut} icon={<LoginOutlined />}>Выйти</Button> :
            <Button onClick={handleClickAuth}>Логин</Button>
        }
      </Navigator>
      <ModalWithAddMovie
        open={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        onCancel={() => setIsOpenModal(false)}
      />
      {contextHolder}
    </HeaderContainer>
  );
};
