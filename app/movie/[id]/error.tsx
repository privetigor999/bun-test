'use client';
import { routes } from "@/data/routes";
import { Button } from "antd";
import Link from "next/link";
import styled from "styled-components";

export default function Error() {
  const Container = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 50px);
    padding: 20px 30px;
  `;

  const ErrorMessage = styled.p`
    margin-bottom: 10px;
  `;

  return (
    <Container>
      <ErrorMessage>Такого фильма нет :(</ErrorMessage>
      <Link href={routes.main}>
        <Button type='primary'>На главную</Button>
      </Link>
    </Container>
  );
};