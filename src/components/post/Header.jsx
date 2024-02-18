import { Box, Flex, Text } from "@chakra-ui/react";
import UsernameButton from "../profile/UsernameButton";
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
                <UsernameButton user={user} />
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


