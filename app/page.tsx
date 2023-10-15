'use client'
import { useEffect } from 'react'
import styles from './page.module.css'
import { collection, doc, setDoc } from 'firebase/firestore'; 
import { db } from '@/firebase';
import { Input } from 'antd';

export default function Home() {
  useEffect(() => {
    fetchData()
    console.log("post")
  }, [])

  const citiesRef = collection(db, "movies");

  const fetchData = async () => {
    await setDoc(doc(citiesRef, 'haha2'), {
      name: "San Francisco", state: "CA", country: "USA",
      capital: false, population: 860000,
      regions: ["west_coast", "norcal"] });
  }


  return (
    <main className={styles.main}>
      <Input.Search 
        placeholder='Поиск фильма'
        allowClear
        enterButton
      />
    </main>
  )
}
