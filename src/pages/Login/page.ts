import { NavigateFunction } from "react-router";
import { callLoginEndpoint, googleOAuthRequest } from "../../hooks/authorizationEndpoints";
import { LoginProps } from "./types";


export const attemptGoogleOAuth = (navigate: NavigateFunction) => {
    googleOAuthRequest()
    .then((response: {access_token: string}) => {
        if (response.access_token) {
            localStorage.setItem("jwt", response.access_token);
            navigate("/");

        } else {
            alert(`Google Authentication did not complete successfully! Please try again!`)
        }

    })
    .catch(() => alert(`Error occurred authenticating with Google. Tell the developer he sucks and please try again!`));

}


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