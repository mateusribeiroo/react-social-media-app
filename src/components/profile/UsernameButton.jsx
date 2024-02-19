import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PROTECTED } from "../../lib/routes.jsx";


export default function UsernameButton({ user }){
 return (
   <Button 
    colorScheme="teal" 
    variant="link"
    as={Link}
    to={`${PROTECTED}/profile/${user.id}`}
   >
    {user.username} 
   </Button>
 )
}
