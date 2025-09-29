import { User } from "../../../types/user";

export const UserOption = (authenticatedUser: User, userID: number, displayName: string) => {
    return (
        <option 
            id={`league-dropdown-input-${userID}-option`}
            key={`league-dropdown-input-${userID}-option`}
            value={userID}
        >
            { authenticatedUser.userID === userID ? `(Me) ${displayName}` : displayName }
        </option>
    );
}