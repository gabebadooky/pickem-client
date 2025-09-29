import { User } from "../../../types/user";


export type UserDropdownProps = {
    allUsers: User[];
    authenticatedUser: User;
    userFilter: number;
    setUserFilter: React.Dispatch<React.SetStateAction<number>>;
}