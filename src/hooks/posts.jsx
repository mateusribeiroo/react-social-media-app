import { uuidv4 } from "@firebase/util";
import { useState } from "react";

import { 
  doc, 
  setDoc, 
  query, 
  collection, 
  orderBy, 
  updateDoc, 
  arrayRemove, 
  arrayUnion, 
  deleteDoc, 
  where, 
  getDocs } 
from "firebase/firestore";

import { db } from "../lib/firebase";
import { useToast } from "@chakra-ui/react";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";

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

export function useGetPostsByUID(uid){
  const q = query(collection(db, "posts"), 
    where("uid", "==", uid)
  )

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

export function useDeletePost(id){
 const [isLoading, setIsLoading] = useState(false);
 const toast = useToast();

  async function deletePost(){
    const res = window.confirm("Tem certeza que deseja deletar este post?");
    if(res){
      setIsLoading(true);
     
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);

      const q = query(collection(db, "comments"), where("postID", "==", id));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => deleteDoc(doc.ref));
      
      toast({
        title: "Post deletado",
        position: "top",
        status: "info",
        isClosabe: true,
        duration: 5000,
      });

      setIsLoading(false);
    }
 }

 return { deletePost, isLoading };
}

export function usePost(id){
  const q = doc(db, "posts", id);
  const [post, isLoading] = useDocumentData(q);

  return { post, isLoading };
}
