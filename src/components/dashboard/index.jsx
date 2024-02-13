import { Box, HStack, Heading, Button } from '@chakra-ui/react';

export default function Dashboard() {
    return (
        <Box maxW="600px" mx="auto" py="10">
            <form>
                <HStack justify="space-between">
                    <Heading size="lg">Nova Postagem</Heading>
                    <Button colorScheme="teal">Postar</Button>
                </HStack>
            </form>
        </Box>       
    );
}
