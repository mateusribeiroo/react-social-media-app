import { doc, query } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db, storage } from "../lib/firebase";
import { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { useToast } from "@chakra-ui/react";

export function useUser(id){
    const q = query(doc(db, "users", id));
    const [user, isLoading] = useDocumentData(q);

    return { user, isLoading };
}

export function useUpdateAvatar(uid){
    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    async function updateAvatar(){
        setIsLoading(true);

        const fileRef = ref(storage, "avatar/" + uid)

        await uploadBytes(fileRef, file);

        toast({

        })//set toast here

        setIsLoading(false);
    }

    return { setFile, updateAvatar, isLoading };
}