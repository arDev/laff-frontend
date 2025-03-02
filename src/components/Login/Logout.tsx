import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../Store/useAuthStore";

export const Logout = () => {
    const navigate = useNavigate()
    const { clearToken } = useAuthStore();

    clearToken()
    localStorage.setItem("token","")
    //checking whether token is preset or not
    useEffect(()=>{
        navigate("/jugadores")
    },[])

    return (<></>)
  };
  