import { redirect } from "react-router";
import { callRegisterNewUserEndpoint } from "../../hooks/authorizationEndpoints";
import { NewUserProperties, RegisterAttemptResponses } from "./types";


export const attemptRegistration = (props: NewUserProperties, setUsernameTaken: React.Dispatch<React.SetStateAction<boolean>>): RegisterAttemptResponses => {
    if (props.username && props.password && props.displayName && props.favoriteTeam) {
        callRegisterNewUserEndpoint(
            props.username, props.password, props.displayName, props.favoriteTeam,
            props.notificationPreference, props.emailAddress, props.phone
        )
        .then((response) => {
            if (response?.accessToken) {
                localStorage.setItem("jwt", response.accessToken);
                redirect("/")

            } else {
                setUsernameTaken(true);

            }
        })
        .catch((err) => {
            console.log(`Error occurred calling /auth/register endpoint:\n${err}`);
            alert(`Unexpected error occurred creating new user account. Please try again and tell the developer he sucks 🙃`);

        });

    }

    return "Existing";
}