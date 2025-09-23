import { redirect } from "react-router";
import { callRegisterNewUserEndpoint } from "../../hooks/authorizationEndpoints";
import { RegisterProps } from "./types";


export const attemptRegistration = (props: RegisterProps) => {
    if (props.username && props.password && props.displayName && props.favoriteTeam) {
        callRegisterNewUserEndpoint(
            props.username, props.password, props.displayName, props.favoriteTeam,
            props.notificationPreference, props.emailAddress, props.phone
        )
        .then(() => redirect("/"))
        .catch((err) => {
            alert(`Unexpected error occurred creating new user account.\n\n
                    ${err}
                    \n\nPlease try again and tell the developer he sucks 🙃`);
        });

    }
}