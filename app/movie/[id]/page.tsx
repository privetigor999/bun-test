/* eslint-disable @next/next/no-async-client-component */
import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { Flex } from 'antd';
import { MovieFullPage } from '@/components/MovieFullPage';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

import type { IMovie } from '@/interface/movie';
import type { IBreadcrumb } from '@/components/ui/Breadcrumbs/interface';
import { notFound } from 'next/navigation';

export default async function Movie({ params }: { params: { id: string } }){
  const movieResp = await getDoc(doc(db, 'movies', params.id));
  const movie: IMovie | undefined = movieResp.data();
  
  if (!movieResp) {
    notFound();
  }

  const crumbs: IBreadcrumb[] = [
    {title: 'Главная', src: '/'},
    {title: movie!.title, src: null}
  ];

  const styledBreadcrumbs = {
    margin: '10px 0'
  };

  return (
    <Flex vertical style={{padding: '0 30px'}}>
      <Breadcrumbs crumbs={crumbs} style={styledBreadcrumbs}/>
      <MovieFullPage movie={movie}/>
    </Flex>
  )
}
