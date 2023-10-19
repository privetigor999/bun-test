import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Flex, Form, Input, notification } from 'antd';
import type { IUser } from '@/interface/user';
import styled from 'styled-components';
import { SendOutlined } from '@ant-design/icons';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { v4 as uuidv4 } from 'uuid';
import { dbCollection } from '@/data/db';
import { IFormValues } from '@/components/Header/ModalWithAddMovie/interface';

interface ICommentInputProps {
  user: IUser;
  transliterate: IFormValues['transliterate']
}

interface IFormUpdateComment {
  message: string;
}

export const CommentInput = ({user, transliterate}: ICommentInputProps) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const handleSubmit = async (values: IFormUpdateComment) => {
    try {
      const id = uuidv4();

      await updateDoc(doc(db, dbCollection.movies, transliterate), {
        comments: arrayUnion({
          photoUrl: user.photo,
          name: user.name,
          timestamp: new Date().getTime(),
          id,
          message: values.message
        })
      });

      form.resetFields();

      api.success({
        message: 'Комментарий отправлен',
        description: 'Скоро он появится',
        placement: 'topRight'
      })
    } catch (error) {
      api.error({
        message: 'Произошла ошибка',
        description: 'Попробуйте потправить комментарий позже',
        placement: 'topRight'
      })
    }
  }

  const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: start;
  `;

  return (
    <Flex style={{width: 'inherit'}}>
      {contextHolder}
      <Image src={user.photo} width={30} height={30} alt={user.name} style={{borderRadius: '50%'}}/>
      <Form form={form} onFinishFailed={(e) => console.log(e)} onFinish={handleSubmit}>
        <InputContainer>
          <Form.Item name='message'>
            <Input.TextArea maxLength={300} style={{marginLeft: '4px'}}/>
          </Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            icon={<SendOutlined />}
            size='small'
            style={{marginLeft: '8px'}}
          />
        </InputContainer>
      </Form>
    </Flex>
  )
}
