import { uuidv4 } from "@firebase/util";
import { useState } from "react";
import { doc, setDoc, query, collection, orderBy, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useToast } from "@chakra-ui/react";
import { useCollectionData } from "react-firebase-hooks/firestore";

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

export function usePosts(){
  const q = query(collection(db, "posts"), orderBy("date", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);

  if(error) throw error;

  return { posts, isLoading };
}

export function useToggleLike({ id, isLiked, uid }){
  const [isLoading, setIsLoading] = useState(false);


  async function toggleLike(){
    setIsLoading(true);
    const docRef = doc(db, "posts", id);

    await updateDoc(docRef, {
      likes: isLiked ? arrayRemove(uid) : arrayUnion(uid)
    });

    setIsLoading(false);
  }

  return { toggleLike, isLoading };
}
