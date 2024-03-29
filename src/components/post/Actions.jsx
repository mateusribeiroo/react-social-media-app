import { Flex, IconButton } from "@chakra-ui/react";
import { FaRegHeart, FaHeart, FaComment, FaRegComment, FaTrash } from "react-icons/fa";
import { useAuth } from "../../hooks/auth.jsx";
import { useToggleLike, useDeletePost } from "../../hooks/posts.jsx";
import { useComments } from "../../hooks/comment.jsx";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../lib/routes.jsx";

export function Actions({ post }){
    const { id, likes } = post;
    const { user, isLoading: userLoading } = useAuth();
    const isLiked = likes.includes(user?.id);

    const { toggleLike, isLoading: likeLoading } = useToggleLike({ id, isLiked, uid: user?.id });
    const { deletePost, isLoading: deletePostLoading } = useDeletePost(id);
    const { comments, isLoading: commentLoading } = useComments(id);   
    
    //TODO: se o usuário comentar em algum post ele deve ver o simbolo FaComment, 
    //TODO: do contrario ele vera o FaRegComment

    
    return (
        <Flex p="2">
            <Flex alignItems="center">
                <IconButton 
                    onClick={toggleLike}
                    isLoading={likeLoading || userLoading}
                    size="md" 
                    colorScheme="red" 
                    variant="ghost" 
                    icon={isLiked ? <FaHeart /> : <FaRegHeart />}
                    isRound
                />
                { likes.length }
            </Flex>
            <Flex alignItems="center" ml="2">
                <IconButton
                    as={Link}
                    to={`${PROTECTED}/comments/${id}`}
                    //onClick={toggleLike}
                    //isLoading={likeLoading || userLoading}
                    size="md" 
                    colorScheme="teal" 
                    variant="ghost" 
                    icon={comments?.length > 0 ? <FaComment /> : <FaRegComment />}
                    isRound
                />
                { comments?.length }
            </Flex>
                {
                    !userLoading && (user.id == post.uid) ? 
                    (
                        <IconButton
                            onClick={deletePost}
                            isLoading={deletePostLoading}
                            ml="auto"
                            size="md" 
                            colorScheme="red"
                            variant="ghost" 
                            icon={<FaTrash />}
                            isRound
                        />
                    )
                    :
                    (
                        <>
                        </>
                    )
                }
        </Flex>
    );
}


