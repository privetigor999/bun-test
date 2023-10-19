import React from 'react';
import { MoviesList } from '@/components/MoviesList';

import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <MoviesList />
    </main>
  );
};
