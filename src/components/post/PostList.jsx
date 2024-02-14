import Post from "./index.jsx";
import { Box } from "@chakra-ui/react";

export default function PostList({ posts }) {
  return (
    <Box px="4">
      {posts?.lenght === 0 ? ("Sem postagens") : posts?.map(post => <Post key={post.id} post={post} />)}
    </Box>
  )
}
