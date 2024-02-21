import { Flex, IconButton } from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuth } from "../../hooks/auth.jsx";
import { useToggleLike } from "../../hooks/posts.jsx";

export function Actions({ post }){
    const { id, likes } = post;
    const { user, isLoading: userLoading } = useAuth();
    const isLiked = likes.includes(user?.id);
    const { toggleLike, isLoading: likeLoading } = useToggleLike({ id, isLiked, uid: user?.id });
    
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
        </Flex>
    );
}


