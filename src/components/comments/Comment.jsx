import { Flex } from "@chakra-ui/react";
import Avatar from "../profile/Avatar";
import { useUser } from "../../hooks/users";

export default function Comment({ data }){
  const { user, isLoading: userLoading } = useUser(data.uid);

  //TODO: estilizar loading
  if(userLoading) return "Carregando usuário";

  return (
    <Flex minW="600px">
      <Avatar user={user} size="sm"/> 
      
    </Flex>
  );
}
