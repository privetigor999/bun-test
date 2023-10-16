import { Dispatch, SetStateAction } from 'react';
import { Input, Form } from 'antd';
import { IMovie } from '@/interface/movie';
import { filter } from 'lodash';

interface IFilterMoviePanel {
  movies: IMovie[];
  filteredMovies: IMovie[];
  setFilteredMovies: Dispatch<SetStateAction<IMovie[]>>;
}

export const FilterMoviePanel = ({movies, filteredMovies, setFilteredMovies}: IFilterMoviePanel) => {
  const [form] = Form.useForm();

  const handleChangeInpuValue = () => {
    const fieldValue = form.getFieldValue('filterInput');
    const filteredMoviesData = filter(movies, movie => {
      return movie.title!.toLowerCase().includes(fieldValue.toLowerCase());
    });

    setFilteredMovies(filteredMoviesData);
  }

  return (
    <Form
      form={form}
      style={{width: '100%', padding: '0 30px', marginTop: '10px'}}
    >
      <Form.Item name='filterInput'>
        <Input 
          placeholder='Поиск по названию'
          allowClear
          onChange={handleChangeInpuValue}
        />
      </Form.Item>
    </Form>
  )
}
