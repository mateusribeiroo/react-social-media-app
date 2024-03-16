import { doc, query, updateDoc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db, storage } from "../lib/firebase";
import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function useUser(id){
    const q = query(doc(db, "users", id));
    const [user, isLoading] = useDocumentData(q);

    return { user, isLoading };
}

export function useUpdateAvatar(uid){
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    async function updateAvatar(){
        if(!file){
            toast({
                title: "Nenhum arquivo selecionado",
                description: "Por favor selecione uma imagem para enviar",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000,
            })
            return;
        }

        setIsLoading(true);
        const fileRef = ref(storage, "avatar/" + uid)
        await uploadBytes(fileRef, file);

        const avatarURL = await getDownloadURL(fileRef);

        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, { avatar: avatarURL });

        toast({
            title: "Avatar atualizado",
            status: "success",
            isClosable: true,
            position: "top",
            duration: 5000,
        })

        setIsLoading(false);

        navigate(0);
    }

    return { setFile, updateAvatar, isLoading, fileURL: file && URL.createObjectURL(file) };
}