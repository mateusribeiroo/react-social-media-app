import { Box, Flex, Text } from "@chakra-ui/react";
import Avatar from "../profile/Avatar";
import { useUser } from "../../hooks/users";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import UsernameButton from "../profile/UsernameButton";

export default function Comment({ data }){
  const { user, isLoading: userLoading } = useUser(data.uid);

  //TODO: estilizar loading
  if(userLoading) return "Carregando usuário";

  return (
    <Box px="4" py="2" minW="600px" mx="auto" textAlign="left">
      <Flex pb="2">
        <Avatar user={user} size="sm"/> 
        <Box flex="1" ml="4">
          <Flex borderBottom="1px solid" borderColor="teal.100" pb="2">
            <Box>
              <UsernameButton user={user} /> 
              <Text fontSize="xs" color="gray.500">
                Há {formatDistanceToNow(data.date, {locale: ptBR})}
              </Text>
            </Box>
          </Flex>
          <Box pt="2" fontSize="sm">
            <Text>{data.text}</Text>
          </Box>
        </Box>
      </Flex>  
    </Box>
  );
}
