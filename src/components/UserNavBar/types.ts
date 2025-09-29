import { User } from "../../types/user";


export type UserNavBarProps = {
    allUsers: User[];
    authenticatedUser: User;
    setUserFilter: React.Dispatch<React.SetStateAction<number>>;
    userFilter: number;
}