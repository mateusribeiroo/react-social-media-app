import { useAuthState, useSignOut } from 'react-firebase-hooks/auth'
import { useState, useEffect } from 'react'
import { auth, db } from '../lib/firebase'
import { DASHBOARD, LOGIN } from '../lib/routes';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {setDoc, doc, getDoc} from 'firebase/firestore'
import { isUsernameExists } from "../utils/isUsernameExists"

export function useAuth(){
    const [authUser, authLoading, error] = useAuthState(auth);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData(){
            setLoading(true);
            const ref = doc(db, "users", authUser.uid);
            const docSnap = await getDoc(ref);
            setUser(docSnap.data());
            setLoading(false);
        }

        if(!authLoading){
            if(authUser){
                fetchData();
            }else{
                setLoading(false);// nao logado
            }
        }
    }, [authLoading]);

    return {
        user,
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

export function useRegister() {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    async function register({ username, email, password, redirectTo=DASHBOARD }){
        setIsLoading(true);
        const usernameExists = await isUsernameExists(username);

        if(usernameExists){
            toast({
                title: "Nome de usuário já existe!",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000
            })
            setIsLoading(false);
        }else{
            try {
                const res = await createUserWithEmailAndPassword(auth, email, password);

                setDoc(doc(db, "users", res.user.uid), {
                    id: res.user.uid,
                    username: username.toLowerCase(),
                    avatar: "",
                    date: Date.now()
                });

                toast({
                    title: "Conta criada com sucesso!",
                    description: "Você está logado!",
                    status: "success",
                    isClosable: true,
                    position: "top",
                    duration: 5000,
                })

            } catch (error) {
                toast({
                    title: "Não foi possível registrar!",
                    status: "error",
                    isClosable: true,
                    position: "top",
                    duration: 5000,
                    description: error.message
                })
            }
        }
        setIsLoading(false);

      
    }

    return {register, isLoading};
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