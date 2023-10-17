import { useState } from 'react';
import { Button,
  Flex,
  Form,
  Input,
  Modal,
  Progress,
  Select,
  Space,
  Upload, 
  notification} from 'antd';
import { db, storage } from '@/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { transliterate } from 'transliteration';
import { replace } from 'lodash';
import { UploadOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

import { getYearArray } from './getYearArray';
import { dbCollection } from '@/data/db';
import { actors } from './actors';
import type { IFile } from './interface';
import type { IMovie } from '@/interface/movie';

interface IModalWithAddMovieProps {
  open: boolean;
  onCancel: () => void;
  closeModal: () => void;
};

export const ModalWithAddMovie = ({open, onCancel, closeModal}: IModalWithAddMovieProps) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [imageFile, setImageFile] = useState<IFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadPercentage, setUploadPercentage] = useState<number | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [uploadImageError, setUploadImageError] = useState<boolean>(false);

  const handleSubmit = (values: IMovie) => {
    const transValueWithChangeWhitespaceToUnderline = replace(transliterate(values.title), / /g, '_');
    const transWithoutSymbols = replace(transliterate(transValueWithChangeWhitespaceToUnderline), /[^a-zA-Z0-9_]/g, '').toLowerCase();

    const postFormData = async () => {
      setLoading(true);

      const moviesRef = collection(db, dbCollection.movies);

      const id = uuidv4();

      try {
        await setDoc(doc(moviesRef, transWithoutSymbols), {
          ...values,
          transliterate: transWithoutSymbols,
          poster: downloadUrl,
          id,
          countRate: 0,
          rate: 0
        });

        api.success({
          message: `Фильм ${values.title} отправлен`,
          description: 'Скоро он появится в списке',
          placement: 'topRight'
        })
        
        closeModal();
      } catch (error) {
        api.error({
          message: `Произошла ошибка`,
          description: 'Повторите попытку позже',
          placement: 'topRight'
        })
      } finally {
        setLoading(false);
      }
    }

    postFormData()
  };

  const uploadImage = async ({file}: IFile) => {
    const name = new Date().getTime() + '_movie';

    const storageRef = ref(storage, name);

    const uploadTask = uploadBytesResumable(storageRef, file);
    setImageFile(file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setUploadPercentage(progress);
      },

      (error) => {
        console.debug('error: ', error)
      },

      async () => {
        setUploadImageError(false);
        setDownloadUrl(null);

        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setDownloadUrl(url);
        } catch (error) {
          setDownloadUrl(null);
          setUploadImageError(true);
        }
      }
    )

    return downloadUrl;
  }

  return (
    <Modal
      title='Добавить фильм'
      open={open}
      onCancel={onCancel}
      footer={null}
    >
      {contextHolder}
      <Form
        form={form}
        onFinish={handleSubmit}
        autoComplete='off'
        name='add_movie'
        onFinishFailed={(v) => console.debug(v)}
      >
        <Form.Item
          label='Название'
          name='title'
          rules={[{required: true, message: 'Название фильма обязательно'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label='Описание'
          name='description'
          rules={[{required: true, message: 'Описание обязательно'}]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label='Год выхода'
          name='year'
          rules={[{required: true, message: 'Год выхода обязателен'}]}
        >
          <Select
            options={getYearArray(1990)}
            placeholder='...'
          />
        </Form.Item>
        <Form.Item
          label='Актеры'
          name='actors'
          rules={[{required: true, message: 'Минимум один актер'}]}
        >
          <Select
            mode='tags'
            placeholder='Введите актера'
            options={actors}
            showSearch
          />
        </Form.Item>
        <Form.Item
          label='Постер'
          name='poster'
          tooltip='Формат файлов: png, jpg, jpeg'
          rules={[{required: true, message: 'Изображение обязательно'}]}
        >
          <Upload
            name='posterImg'
            maxCount={1}
            accept='image/png, image/jpg, image/jpeg'
            customRequest={uploadImage}
            showUploadList={false}
          >
            <Button type='dashed' icon={<UploadOutlined />}>Загрузить</Button>
          </Upload>
        </Form.Item>
          {imageFile && (
            <Space
              direction='vertical'
              style={{
                width: '100%',
                padding: 10,
                marginBottom: 24,
                backgroundColor: '#e8e2e2',
                borderRadius: 6
              }}
            >
              <Space>
                {imageFile.name}
              </Space>
              <Progress percent={uploadPercentage!}/>
            </Space>
          )}
        <Flex justify='right'>
          <Button
            style={{marginLeft: '10px'}}
            type='primary'
            htmlType='submit'
            loading={loading}
            >
            {loading ? 'Отправляем' : 'Отправить'}
          </Button>
        </Flex>
      </Form>
    </Modal>
  )
}
