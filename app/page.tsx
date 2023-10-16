'use client'
import React from 'react';
import { Input } from 'antd';
import { MoviesList } from '@/components/MoviesList';
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <Input.Search 
        placeholder='Поиск фильма'
        allowClear
        enterButton
      />
      <MoviesList />
    </main>
  )
}
