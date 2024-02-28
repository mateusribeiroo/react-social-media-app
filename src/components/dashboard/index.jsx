import NewPost from "../post/NewPost.jsx";
import PostList from "../post/PostList.jsx";
import { usePosts } from "../../hooks/posts.jsx";
import { Box } from "@chakra-ui/react";

export default function Dashboard() {
    const { posts, isLoading } = usePosts();

    if(isLoading) return (
        <Box 
            w="full" 
            flex="1" 
            alignItems="center" 
            justifyContent="center" 
            textAlign="center"
            fontSize="xl"
            mt="5"
            >
            Carregando posts...
        </Box>
    )

    return (
        <>
            <NewPost />
            <PostList posts={posts} />
        </>
    )
}
