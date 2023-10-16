/* eslint-disable @next/next/no-async-client-component */
'use client';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import React from 'react';
import { Breadcrumb, Flex, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import type { IMovie } from '@/interface/movie';
import { MovieFullPage } from '@/components/MovieFullPage';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import type { IBreadcrumb } from '@/components/ui/Breadcrumbs/interface';

export default async function Movie({params: {id}}){
  const movieResp = (await getDoc(doc(db, 'movies', id)));
  const movie: IMovie | undefined = movieResp.data();

  const crumbs: IBreadcrumb[] = [
    {title: 'Главная', src: '/'},
    {title: movie!.title, src: null}
  ];

  const styledBreadcrumbs = {
    margin: '10px 0'
  }

  return (
    <Flex vertical style={{padding: '0 30px'}}>
      <Breadcrumbs crumbs={crumbs} style={styledBreadcrumbs}/>
      <MovieFullPage movie={movie}/>
    </Flex>
  )
}