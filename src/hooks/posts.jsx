import { uuidv4 } from "@firebase/util";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useToast } from "@chakra-ui/react";

export function useAddPost(){
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function addPost(post){
    setIsLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id, 
      date: Date.now(),
      likes: []
    });
    toast({
      title: "Post adicionado com sucesso!",
      status: "success",
      isClosabe: true,
      position: "top",
      duration: 5000
    });
    setIsLoading(false);
  }

  return { addPost, isLoading}
}