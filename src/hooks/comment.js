import { useToast } from "@chakra-ui/react";
import { setDoc } from "firebase/firestore";
import { useState } from "react";

export function useAddComment(postId){
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function addComment(text){
    setIsLoading(true);
    const id = uuidv4(); 
    const date = Date.now();
    const docRef = doc(db, "comments", id);
    await setDoc(docRef, {text, id, postId, date});

    toast({
      title: "Comentário adicionado",
      status: "success",
      isClosable: true,
      duration: 5000,
      position: "top"
    });

    setIsLoading(false);
  }

  return { addComment, isLoading };
}
