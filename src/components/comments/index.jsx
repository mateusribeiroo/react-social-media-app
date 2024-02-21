import { Box } from "@chakra-ui/react";
import Post from "../post/index";
import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/posts";

export default function Comments(){
  const { id } = useParams();

  const { post, isLoading } = usePost(id);
  
  //lembrar de estilizar o loading
  if(isLoading) return "Carregando postagem..."

  return (
    <Box align="center" pt="50">
      <Post post={post}/> 
    </Box>
  )
}
