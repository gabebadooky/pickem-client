import { NavigateFunction, useNavigate } from "react-router";


export const userLogout = () => {
    const navigate: NavigateFunction = useNavigate();
    localStorage.clear();
    navigate("/")
    window.location.reload();
}