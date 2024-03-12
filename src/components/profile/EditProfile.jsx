import {
    HStack,
    FormControl,
    FormLabel,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from "@chakra-ui/react";
import { useUpdateAvatar } from "../../hooks/users";
import Avatar from "./Avatar";

export default function EditProfile({ isOpen, onClose, user }){
    const { setFile, updateAvatar, isLoading: fileLoading } = useUpdateAvatar(user.id);

    function handleChange(e){
        setFile(e.target.files[0])
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar Perfil</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HStack spacing="5">
                <Avatar user={user} />
                <FormControl py="4">
                    <FormLabel htmlFor="picture">Trocar avatar</FormLabel>
                    <input type="file" accept="image/*" onChange={ handleChange } />
                </FormControl>
              </HStack>

              <Button
                loadingText="Uploading"
                w="full"
                my="6"
                colorScheme="purple"
                onClick={updateAvatar}
                isLoading={fileLoading}
              >
                Salvar
              </Button>
            </ModalBody>
          </ModalContent>
        </Modal>
    );
}


