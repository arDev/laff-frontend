import { useEffect } from "react";
import { useNavigate } from "react-router";

export const FalsoLogin = () => {
    const navigate = useNavigate()
    //getting token from local storage
    localStorage.setItem("token","asd")
    //checking whether token is preset or not
    useEffect(()=>{
        navigate("/equipos")
    },[])

    return (<></>)
    
  };
  