import Post from "./index.jsx";
import { Box, Text } from "@chakra-ui/react";

export default function PostList({ posts }) {
  return (
    <Box px="4">
      {posts?.length === 0 ? (
        <Text fontSize="xl" textAlign="center">Sem posts por enquanto, um pouco solitário por aqui...</Text>
      ) : ( 
        posts?.map((post) => <Post m="auto" key={post.id} post={post} />)
      )}
    </Box>
  );
}
