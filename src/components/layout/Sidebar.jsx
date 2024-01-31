import { Box, Button, Stack, Code } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { USERS, PROTECTED } from "../../lib/routes"
import { useAuth } from "../../hooks/auth";
import Avatar from "../profile/Avatar"
 
function User(){
    const {user, isLoading} = useAuth();

    if(isLoading) return "Carregando...";

    return(
        <Stack align="center" spacing="5" my="8">
            <Avatar user={user} />
            <Code>@{user.username}</Code>
            <Button 
                as={Link} 
                w="full" 
                colorScheme="teal"
                to={`${PROTECTED}/profile/${user.id}`}
            >
            Editar Perfil
            </Button>
        </Stack>   
    )
}

export default function Sidebar(){
    return (
        <>
            <Box 
                px="6"
                height="100vh"
                w="100%"
                maxW="300px" 
                borderLeft="1px solid"
                borderLeftColor="teal.100"
                position="sticky"
                top="16"
                display={{ base: "none", md: "block" }}
            >
                <User />
                <Box align="center">
                    <Box as="ul" borderBottom="2px solid" borderColor="teal.200"/>
                    <Button
                        variant="outline"
                        colorScheme="teal"
                        as={Link}
                        to={USERS}
                        mt="4"
                        size="sm"
                    >
                        Ver Usuários
                    </Button>
                </Box>
            </Box> 
        </>
    );
}

