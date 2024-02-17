import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Avatar from "../profile/Avatar"
import { useUser } from "../../hooks/users"

export function Header({ uid, date }){
    const {user, isLoading} = useUser(uid);

    if(isLoading){
        return (
            <Text 
                fontSize="xl" 
                textAlign="center"
            >
                Carregando dados de usuário...
            </Text>
        );
    }

    return (
        <Flex 
            alignItems="center"
            borderBottom="2px solid"
            borderColor="tela.100"
            p="3"
            bg="gray.50"
        >
            <Avatar user={user} size="md"/>

            <Box ml="4">
                <Button
                    colorScheme="teal"
                    variant="link"
                >
                {user.username}
                </Button>
                <Text
                    fontSize="sm"
                    color="gray.500"
                >
                    Há {date}
                </Text>
            </Box>
        </Flex>
    );
}


