import { Box, Flex, Text, IconButton, Button } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import Avatar from "../profile/Avatar";
import { useUser } from "../../hooks/users";
import { useAuth } from "../../hooks/auth"; 
import { useDeleteComment } from "../../hooks/comment";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import UsernameButton from "../profile/UsernameButton";
import { useDisclosure } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

export default function Comment({ comment }){
  const { user, isLoading: userLoading } = useUser(comment.uid);
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { deleteComment, isLoading: deleteCommentLoading } = useDeleteComment(comment.id);

  const { isOpen, onOpen, onClose } = useDisclosure()

  //TODO: estilizar loading
  if(userLoading) return "Carregando usuário";

  return (
    <Box px="4" py="2" minW="600px" mx="auto" textAlign="left">
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay backdropFilter="blur(3px)"/>
        <ModalContent>
            <ModalHeader>Tem certeza que deseja excluir seu comentário?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text textColor="teal">Esta ação será permanente</Text>
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='teal' mr={3} onClick={onClose}>
                Fechar
                </Button>
                <Button colorScheme="red" onClick={deleteComment}>Tenho certeza!</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>


      <Flex pb="2">
        <Avatar user={user} size="sm"/> 
        <Box flex="1" ml="4">
          <Flex borderBottom="1px solid" borderColor="teal.100" pb="2">
            <Box>
              <UsernameButton user={user} /> 
              <Text fontSize="xs" color="gray.500">
                Há {formatDistanceToNow(comment.date, {locale: ptBR})}
              </Text>
            </Box>
            {// ** Determina se o botão de apagar comentário deve aparecer
              !authLoading && authUser.id === comment.uid && (
                <IconButton 
                  size="sm"
                  onClick={onOpen}
                  //onClick={deleteComment}
                  isLoading={deleteCommentLoading}
                  ml="auto"
                  icon={<FaTrash />}
                  colorScheme="red"
                  variant="ghost"
                  isRound
                />
              )
            }
          </Flex>
          <Box pt="2" fontSize="sm">
            <Text>{comment.text}</Text>
          </Box>
        </Box>
      </Flex>  
    </Box>
  );
}
