import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import { useState } from 'react'
import { auth } from '../lib/firebase'
import { DASHBOARD, LOGIN } from '../lib/routes';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function useAuth(){
    
    const [authUser, isLoading, error] = useAuthState(auth);

    return {
        user: authUser,
        isLoading,
        error
    }
}

export function useLogin() {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    async function login({email, password, redirectTo=DASHBOARD}){
        setIsLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({
                title: "Você entrou!",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000,
            })
            navigate(redirectTo);
        } catch (error) {
            toast({
                title: "Falhou ;-;",
                status: "error",
                description: error.message,
                isClosable: true,
                position: "top",
                duration: 5000,
            })
            setIsLoading(false);
            return false;
        }
        setIsLoading(false);
        return true;
    }
    return { login, isLoading };
}


export function useLogout(){
    const [signOut, isLoading, error] = useSignOut(auth);
    const toast = useToast();
    const navigate = useNavigate();

    async function logout(){
        if(await signOut()){
            toast({
                title: "Usuário desconectado!",
                status: "success",
                isClosable: true,
                position: "top",
                duration: 5000,
            })
            navigate(LOGIN);
        }else{
            toast({
                title: "Não foi possível desconectar o usuário!",
                status: "error",
                description: error.message,
                isClosable: true,
                position: "top",
                duration: 5000,
            })
        }
    }

    return {logout, isLoading};
}