import { Flex, IconButton } from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export function Actions({ post }){
    const { likes } = post;
    const isLiked = false;

    return (
        <Flex p="2">
            <Flex alignItems="center">

                <IconButton 
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


