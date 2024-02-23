import { useToast } from "@chakra-ui/react";
import { collection, doc, orderBy, query, setDoc, where } from "firebase/firestore";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../lib/firebase";
import { uuidv4 } from "@firebase/util";

export function useAddComment({ postID }){
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function addComment(text){
    setIsLoading(true);
    const id = uuidv4(); 
    const date = Date.now();
    const docRef = doc(db, "comments", id);
    await setDoc(docRef, {text, id, postID, date});

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

export function useComments(postID){

  const q = query(
    collection(db, "comments"), 
    where("postID", "==", postID), 
    orderBy("date", "asc")
  );

  const [comments, isLoading, error] = useCollectionData(q);

  if(error) throw error;

  return { comments, isLoading };

}
