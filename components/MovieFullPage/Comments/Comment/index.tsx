import Image from 'next/image';
import { Flex } from 'antd';
import styled from 'styled-components';
import { formatDate } from '@/helpers/formatDate';

import type { IComment } from '@/interface/movie';

interface ICommentProps {
  comment: IComment
}

const CommentContainer = styled.div`
  max-width: 400px;
  padding: 4px 10px;
  background-color: #ececec;
  border-radius: 4px;

  & + & {
    margin-top: 8px;

    @media (min-width: 375px) {
      margin-top: 10px;
    }
  }

  @media (min-width:375px) {
    padding: 8px 12px;
  }
`;

const Username = styled.p`
  font-weight:700;
  margin: 0 10px;
`;

const DateComponent = styled.time`
  
`;

export const Comment = ({comment}: ICommentProps) => {
  return (
    <CommentContainer>
      <Flex>
        <Image
          style={{borderRadius:'50%'}}
          src={comment.photoUrl}
          width={20}
          height={20}
          alt={`аватар пользователя ${comment.name}`}
        />
        <Username>{comment.name}</Username>
        <DateComponent>{formatDate(comment.timestamp)}</DateComponent>
      </Flex>
      {comment.message}
    </CommentContainer>
  );
};
