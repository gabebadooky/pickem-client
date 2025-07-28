import { validateToken } from "./validateToken";

export const userLogout = () => {
    localStorage.clear();
    validateToken();
    window.location.reload();
}