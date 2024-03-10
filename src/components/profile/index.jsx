import { Stack, Flex, HStack, Divider, Text } from "@chakra-ui/react";
import { useUser } from "../../hooks/users";
import { useParams } from "react-router-dom";
import { useGetPostsByUID } from "../../hooks/posts";
import Avatar from "./Avatar";
import UsernameButton from "./UsernameButton";

export default function Profile(){
    let likes = 0;
    const { id }  = useParams();
    const { user, isLoading } = useUser(id);
    const { posts, isLoading: postsLoading } = useGetPostsByUID(id);
    
    if (isLoading) return "Carregando...";
    
    posts.forEach(i => likes += i.likes.length);
    

    return (
      <Stack spacing="5">
        <Flex p={["4", "6"]} pos="relative" align="center">
          <Avatar user={user} size="2xl" />
          <Stack ml="10">
            <UsernameButton user={user} />
            <HStack spacing="10">
              <Text color="gray.700" fontSize={["sm", "lg"]}>
                Posts: { posts.length } 
              </Text>
              <Text color="gray.700" fontSize={["sm", "lg"]}>
                Likes: { likes }
              </Text>
              <Text color="gray.700" fontSize={["sm", "lg"]}>
                Entrou em: {  } 
              </Text>
            </HStack>
          </Stack>
        </Flex>
        <Divider />
        <Text></Text>
      </Stack>
    );
}


