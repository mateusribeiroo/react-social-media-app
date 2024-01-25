import { Box, Center, Heading, FormControl, FormLabel, Input, FormErrorMessage, Button, Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { REGISTER } from '../../lib/routes'
import { useLogin } from "../../hooks/auth"
import { useForm } from 'react-hook-form'
import { emailValidate, passwordValidate } from "../../utils/formValidate"

export default function Login(){
    const { login, isLoading } = useLogin();
    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    
    console.log(errors)
    async function handleLogin(data) {
        console.log(data)
        const succeeded = await login({ 
            email: data.email, 
            password: data.password,
        });


        if(succeeded) reset(); //limpa os campos do formulário
    }

    return (
        <Center w="100%" h="100vh">
            <Box mx="1" maxW="md" p="9" borderRadius="lg" borderWidth="1px"> 
                <Heading mb="4" size="lg" textAlign="center">Log In</Heading>
                <form onSubmit={ handleSubmit(handleLogin) }>
                    <FormControl isInvalid={errors.email} py="2">
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="user@email.com" { ...register('email', emailValidate) }></Input>
                        <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={errors.password} py="2">
                        <FormLabel>Senha</FormLabel>
                        <Input type="password" placeholder="senha..." { ...register('password', passwordValidate) }></Input>
                        <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
                    </FormControl>
                    <Button mt="4" type="submit" size="md" colorScheme="teal" w="full" isLoading={isLoading}>Enviar</Button>
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