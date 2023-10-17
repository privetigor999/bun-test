import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Input, Form, Select, Button } from 'antd';
import { IMovie } from '@/interface/movie';
import { filter } from 'lodash';
import styled from 'styled-components';
import { getYearArray } from '@/components/Header/ModalWithAddMovie/getYearArray';

interface IFilterMoviePanel {
  movies: IMovie[];
  setFilteredMovies: Dispatch<SetStateAction<IMovie[]>>;
}

export const FilterMoviePanel = ({movies, setFilteredMovies}: IFilterMoviePanel) => {
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState('');
  const [year, setYear] = useState(null);

  console.log('inputValue', inputValue)
  console.log('year', year)

  const handleChangeInpuValue = () => {
    const fieldValue = form.getFieldValue('filterInput');

    setInputValue(fieldValue);
  };

  useEffect(() => {
    const filteredMoviesData: IMovie[] = filter(movies, movie => {
        if (!inputValue.trim() && !year) {
          console.log('1')
          return movies;
        }

        if (inputValue.trim() && !year) {
          console.log('2')
          return movie.title!.toLowerCase().includes(inputValue.toLowerCase())
        }

        if (!inputValue.trim()) {
          console.log('3')
          return movie.year === year;
        }

              console.log('4')

        return movie.title.toLowerCase().includes(inputValue.toLowerCase()) && movie.year === year;

    });

    console.log(filteredMoviesData)

    setFilteredMovies(filteredMoviesData);
  }, [inputValue, year]);

  const handleChangeYear = () => {
    const selectedYear = form.getFieldValue('year');
    
    setYear(selectedYear);
  };

  const handleResetBtn = () => {
    setFilteredMovies(movies);

    form.resetFields();
    setInputValue('');
    setYear(null);
  }

  const SelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
      flex-direction: row;
    }
  `;

  const ButtonContainer = styled.div`
    @media (min-width: 768px) {
      margin-left: 10px;
    }
  `;

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
      <SelectContainer>
        <Form.Item name='year' label='Год выхода'>
          <Select 
            options={getYearArray(1990)}
            placeholder='Выбрать'
            onChange={handleChangeYear}
          />
        </Form.Item>
        <ButtonContainer>
          <Button onClick={handleResetBtn} htmlType='reset'>
            Сбросить
          </Button>
        </ButtonContainer>
      </SelectContainer>
    </Form>
  )
}
