export const UserOption = (userID: number, displayName: string) => {
    return (
        <option 
            id={`league-dropdown-input-${userID}-option`}
            key={`league-dropdown-input-${userID}-option`}
            value={userID}
        >
            {displayName}
        </option>
    );
}