import { VStack, Button, Code } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Avatar from "../profile/Avatar";
import { PROTECTED } from "../../lib/routes";

export default function User({ user }) {
    return (
        <VStack
            bg="gray.100"
            shadow="sm"
            rounded="md"
            textAlign="center"
            p="4"
            spacing="3"
        >
            <Avatar user={user} />
            <Code>@{user.username}</Code>
            <Link>
                <Button
                    as={Link}
                    to={`${PROTECTED}/profile/${user.id}`}
                    size="sm"
                    variant="link"
                    colorScheme="purple"
                >
                    Ver Perfil
                </Button>
            </Link>
        </VStack>
    );
}

