import { NavigateFunction } from "react-router";
import { callLoginEndpoint } from "../../hooks/authorizationEndpoints";
import { LoginProps } from "./types";


export const attemptLogin = (props: LoginProps, setIncorrectUsernameOrPassword: React.Dispatch<React.SetStateAction<boolean>>, navigate: NavigateFunction, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (props.username && props.password) {
        setIsLoading(true);
        callLoginEndpoint(props.username, props.password)
        .then((response: {access_token: string}) => {
            if (response?.access_token) {
                localStorage.setItem("jwt", response.access_token);
                navigate("/");
                
            } else {
                setIncorrectUsernameOrPassword(true);
                setIsLoading(false);
                
            }

        })
        .catch((err) => {
            console.log(`Error occurred calling /auth/login endpoint:\n${err}`);
            alert(`Unexpected error occurred loggin in. Please try again and tell the developer he sucks 🙃`);
            setIsLoading(false);

        });

    }

}