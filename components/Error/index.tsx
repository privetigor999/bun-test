import styled from 'styled-components';

export const Error = () => {
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
      <ErrorMessage>Произошла ошибка</ErrorMessage>
    </Container>
  );
};
