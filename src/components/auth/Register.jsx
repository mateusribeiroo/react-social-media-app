import { Box, Center, Heading, FormControl, FormLabel, Input, FormErrorMessage, Button, Link, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { REGISTER, LOGIN, DASHBOARD } from '../../lib/routes'
import { useRegister } from "../../hooks/auth"
import { useForm } from 'react-hook-form'
import { emailValidate, passwordValidate, usernameValidate } from "../../utils/formValidate"

export default function Register(){
    const { register: signup, isLoading } = useRegister();
    const { register, handleSubmit, reset, formState: {errors} } = useForm();
    
    console.log(errors)
    async function handleRegister(data) {
        console.log(data)
        const succeeded = await signup({ 
            username: data.username,
            email: data.email, 
            password: data.password,
            redirectTo: DASHBOARD
        });


        if(succeeded) reset(); //limpa os campos do formulário
    }

    return (
        <Center w="100%" h="100vh">
            <Box mx="1" maxW="md" p="9" borderRadius="lg" borderWidth="1px"> 
                <Heading mb="4" size="lg" textAlign="center">Registre-se</Heading>
                <form onSubmit={ handleSubmit(handleRegister) }>
                    <FormControl isInvalid={errors.username} py="2">
                        <FormLabel>Username</FormLabel>
                        <Input placeholder="username" { ...register('username', usernameValidate) }></Input>
                        <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
                    </FormControl>
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
                    <Button 
                        mt="4" type="submit" 
                        size="md" colorScheme="teal" 
                        w="full" isLoading={isLoading}
                        loadingText="Registrando..."
                    >    
                        Registrar
                    </Button>
                </form>
                <Text fontSize="xlg" align="center" mt="6">
                    Já possui uma conta?{" "}
                    <Link 
                    as={RouterLink}
                    to={LOGIN}
                    color="teal.800"
                    fontWeight="medium"
                    textDecor="underline"
                    _hover={{background: "teal.100"}}
                    >
                    Faça o seu login{" "}
                    </Link>
                </Text>
            </Box>
        </Center>
    )
}