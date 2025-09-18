import { User } from "../../types/user";


export type UserNavBarProps = {
    allUsers: User[];
    setUserFilter: React.Dispatch<React.SetStateAction<number>>;
    userFilter: number;
}