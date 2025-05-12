export type NotificationPreferenceInputValue = "n" | "e" | "p";

export interface User {
    username: string;
    password: string;
    favoriteTeam?: string;
    notificationPreference?: NotificationPreferenceInputValue;
    emailAddress?: string;
    phone?: string;
}

export interface LoginBody {
    username: string;
    password: string;
}

export const NullLoginBody: LoginBody = {
    username: "",
    password: ""
}