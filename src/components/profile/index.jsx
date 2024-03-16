import { 
  Button, 
  Stack, 
  Flex, 
  HStack, 
  Divider, 
  Text, 
  useDisclosure
} from "@chakra-ui/react";
import { useAuth } from "../../hooks/auth";
import { useUser } from "../../hooks/users";
import { useParams } from "react-router-dom";
import { useGetPostsByUID } from "../../hooks/posts";
import { format } from "date-fns/format";
import Avatar from "./Avatar";
import EditProfile from "./EditProfile";
import PostList from "../post/PostList";
import UsernameButton from "./UsernameButton";

export default function Profile(){
    let likes = 0;
    const { id }  = useParams();
    const { user: authUser, isLoading: authLoading } = useAuth();
    const { user, isLoading } = useUser(id);
    const { posts, isLoading: postsLoading } = useGetPostsByUID(id);

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    if (isLoading) return "Carregando...";
    
    posts.forEach(i => likes += i.likes.length);

    return (
      <Stack spacing="5">
        <Flex p={["4", "6"]} pos="relative" align="center">
          <Avatar user={user} size="2xl" />

          {
            authUser.id == user.id ? 
            (
              <Button onClick={onOpen} pos="absolute" mb="2" top="6" right="6" colorScheme="teal">
                Trocar avatar
              </Button>
            ) : 
            (
              <></>
            )
          }

          <Stack ml="10">
            <Text fontSize="2xl"> {user.username} </Text>
            <HStack spacing="10">
              <Text color="gray.700" fontSize={["sm", "lg"]}>
                Posts: { posts.length } 
              </Text>
              <Text color="gray.700" fontSize={["sm", "lg"]}>
                Likes: { likes }
              </Text>
              <Text color="gray.700" fontSize={["sm", "lg"]}>
                Entrou em: { format(user.date, "DDD MMM YYY") } 
              </Text>
            </HStack>
          </Stack>
          <EditProfile isOpen={isOpen} onClose={onClose} user={user}/>
        </Flex>
        <Divider />
        <Text m="auto" fontSize="xl" fontWeigth="500">Posts de {user.username}</Text>
        { postsLoading ? <Text m="auto" fontSize="md">Carregando...</Text> : <PostList  posts={posts}/>}
      </Stack>
    );
}


