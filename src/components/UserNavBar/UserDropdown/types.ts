import { User } from "../../../types/user";


export type UserDropdownProps = {
    allUsers: User[];
    userFilter: number;
    setUserFilter: React.Dispatch<React.SetStateAction<number>>;
}