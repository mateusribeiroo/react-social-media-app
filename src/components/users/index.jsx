import { SimpleGrid } from "@chakra-ui/react";
import { useUsers } from "../../hooks/users";
import User from "./user";

export default function Index(){
    const { users, isLoading } = useUsers();
    
    //TODO estilizar esse Loading
    if(isLoading) return "Carregando usuários";

    return (
        <SimpleGrid columns={[2, 3, 4]} spacing={[2, 3]} px="10px" py="6">
            {
                users?.map((user) => (
                    <User user={user} key={user.id}/>
                ))
            }
        </SimpleGrid>
    );
}

