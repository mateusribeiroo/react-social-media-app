import { Box } from "@chakra-ui/react";
import Post from "../post/index";
import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/posts";
import NewComment from "./NewComment";
import CommentList from "./CommentList";

export default function Comments(){
  const { id } = useParams();

  const { post, isLoading } = usePost(id);
  
  //TODO: estilizar o loading
  if(isLoading) return "Carregando postagem..."

  return (
    <Box pt="50">
      <Post post={post}/> 

      <NewComment post={post}/>

      <CommentList post={post} />
    </Box>
  )
}
