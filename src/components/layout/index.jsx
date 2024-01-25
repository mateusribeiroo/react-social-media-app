import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from 'react'
import { LOGIN } from "../../lib/routes";
import { useAuth } from '../../hooks/auth'
import { Navbar } from "../navbar/index.jsx"

export default function Layout(){
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();
    
    useEffect(() => {
        if(pathname.startsWith("/protected") && !user){
            navigate(LOGIN)
        }
    }, [pathname, user]);

    return (
        <>
            <Navbar/>
            <Outlet /> 
        </>
    );
}

