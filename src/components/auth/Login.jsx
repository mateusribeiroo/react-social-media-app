import { Box, Center, Heading, FormControl, FormLabel, Input, FormErrorMessage, Button, Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { REGISTER } from '../../lib/routes'
import { useLogin } from "../../hooks/auth"
import { useForm } from 'react-hook-form'

export default function Login(){
    const { login, isLoading } = useLogin();
    const { register } = useForm();
    

    return (
        <Center w="100%" h="100vh">
            <Box mx="1" maxW="md" p="9" borderRadius="lg" borderWidth="1px"> 
                <Heading mb="4" size="lg" textAlign="center">Log In</Heading>
                <form onSubmit={ () => {} }>
                    <FormControl isInvalid={true} py="2">
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="user@email.com" { ...register('email') }></Input>
                        <FormErrorMessage>Esta é uma mensagem de erro</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={true} py="2">
                        <FormLabel>Senha</FormLabel>
                        <Input type="password" placeholder="senha..." { ...register('password') }></Input>
                        <FormErrorMessage>Esta é uma mensagem de erro</FormErrorMessage>
                    </FormControl>
                    <Button mt="4" type="submit" size="md" colorScheme="teal" w="full" isLoading={false}>Enviar</Button>
                </form>
                <Text fontSize="xlg" align="center" mt="6">
                    Não possui registro?{" "}
                    <Link 
                    as={RouterLink}
                    to={REGISTER}
                    color="teal.800"
                    fontWeight="medium"
                    textDecor="underline"
                    _hover={{background: "teal.100"}}
                    >
                    Registre-se{" "}
                    </Link>
                    Já!
                </Text>
            </Box>
        </Center>
    )
}