import Comment from "./Comment";
import { useComments } from "../../hooks/comment";
import { Flex } from "@chakra-ui/react";
  
export default function CommentList({ post }){
  const { id } = post;
  const { comments, isLoading: commentsLoading } = useComments(id);

  //TODO: estilizar loading
  if(commentsLoading) return "Carregando comentários...";

  console.log(comments)

  return (
    <Flex justifyContent="center">
      {comments.map((comment) => <Comment data={comment} />)}
    </Flex>
  )  
}
