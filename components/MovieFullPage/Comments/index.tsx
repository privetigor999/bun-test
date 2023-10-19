import { IComment } from "@/interface/movie";
import { Divider, Flex } from "antd";
import styled from "styled-components";
import { Comment } from "./Comment";
import { CommentInput } from "./CommentInput";
import { useStore } from "effector-react";
import { $user } from "@/store/user";

interface ICommentsProps {
  comments: IComment[];
  transliterate: string;
};

const TextContainer = styled.p`

`;

export const Comments = ({comments, transliterate}: ICommentsProps) => {
  const user = useStore($user);

  return (
    <Flex vertical style={{width: '100%', margin: '30px 0'}}>
      <Flex vertical>
        {
          comments.length > 0 ?
            comments.map(comment => (
              <Comment key={comment.id} comment={comment}/>
            )) :
            <TextContainer>Комментариев нет. Вы можете оставить первый комментарий</TextContainer>
        }
      </Flex>
      <Flex vertical style={{width: 'inherit'}}>
        <Divider orientation='left'>Оставить комментарий</Divider>
        {user ?
          <CommentInput user={user} transliterate={transliterate}/> :
          <TextContainer>Войдите, чтобы оставить комментарий</TextContainer>
        }
      </Flex>
    </Flex>
  )
}
