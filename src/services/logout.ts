export const userLogout = () => {
    localStorage.removeItem("jwt");
    window.location.reload();
}