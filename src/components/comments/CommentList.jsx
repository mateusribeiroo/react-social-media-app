import Comment from "./Comment";
import { useComments } from "../../hooks/comment";
import { Box } from "@chakra-ui/react";
  
export default function CommentList({ post }){
  const { id } = post;
  const { comments, isLoading: commentsLoading } = useComments(id);

  //TODO: estilizar loading
  if(commentsLoading) return "Carregando comentários...";

  return (
    <Box mx="auto" maxW="600px"> 
      {comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
    </Box>
  )  
}
