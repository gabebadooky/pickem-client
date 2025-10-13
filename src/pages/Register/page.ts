import { redirect } from "react-router";
import { callRegisterNewUserEndpoint } from "../../hooks/authorizationEndpoints";
import { NewUserProperties, RegisterAttemptResponses } from "./types";


export const attemptRegistration = (props: NewUserProperties, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, setUsernameTaken: React.Dispatch<React.SetStateAction<boolean>>): RegisterAttemptResponses => {
    if (props.username && props.password && props.displayName && props.favoriteTeam) {
        setIsLoading(true);
        callRegisterNewUserEndpoint(
            props.username, props.password, props.displayName, props.favoriteTeam,
            props.notificationPreference, props.emailAddress, props.phone
        )
        .then((response) => {
            if (response?.access_token) {
                localStorage.setItem("jwt", response.accessToken);
                redirect("/");

            } else {
                setUsernameTaken(true);
                setIsLoading(false);

            }
        })
        .catch((err) => {
            console.log(`Error occurred calling /auth/register endpoint:\n${err}`);
            alert(`Unexpected error occurred creating new user account. Please try again and tell the developer he sucks 🙃`);
            setIsLoading(false);

        });

    }

    return "Existing";
}