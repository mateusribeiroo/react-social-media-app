import { Box, HStack, Heading, Button, Textarea } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { useAddPost } from "../../hooks/posts.jsx";
import { useAuth } from "../../hooks/auth.jsx";
import TextareaAutosize from "react-textarea-autosize";

export default function NewPost(){
  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();

  function handlePost(data){
      addPost({
          uid: user.id,
          text: data.text
      })
      reset();
  }

  return (
      <Box maxW="600px" mx="auto" py="10">
          <form onSubmit={handleSubmit(handlePost)}>
              <HStack justify="space-between">
                  <Heading size="lg">Nova Postagem</Heading>
                  <Button colorScheme="teal" type="submit" isLoading={authLoading || addingPost} loadingText="carregando...">Postar</Button>
              </HStack>
              <Textarea 
                  as={TextareaAutosize} 
                  resize="none" 
                  mt="5" 
                  placeholder="Crie uma nova postagem..."
                  minRows={3}
                  {...register("text", {required: true})}
              />
          </form>
      </Box>       
  );
}