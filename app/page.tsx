'use client'
import { useEffect } from 'react'
import styles from './page.module.css'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'; 
import { db } from '@/firebase';
import { Input } from 'antd';
import { MoviesList } from '@/components/MoviesList';
import React from 'react';

export default function Home() {
  // useEffect(() => {
  //   fetchData()
  // }, [])

  // const citiesRef = collection(db, "movies");

  // const fetchData = async () => {
  //   await setDoc(doc(citiesRef, 'haha2'), {
  //     name: "San Francisco", state: "CA", country: "USA",
  //     capital: false, population: 860000,
  //     regions: ["west_coast", "norcal"] });
  // }
  // const [result, setResult] = React.useState()
  // const ref = doc(db, 'movies', 'ee1b35cf-bea3-4cd9-a1ee-d0dd1b8a59da');
  // async function docSnap() {
  //   const data = await getDoc(ref);
  //   setResult(data.data())
  // }

  // useEffect(() => {
  //   docSnap()
  // }, [])

  // console.log(result)
  

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
