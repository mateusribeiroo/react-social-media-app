import { useUsers } from "../../hooks/users";

export default function Index(){
    const { users, isLoading } = useUsers();
    console.log(users);

    return (
        <>
            
        </>
    );
}

