export type NotificationPreferenceInputValue = "n" | "e" | "p";

export interface User {
    userID: number;
    username: string;
    displayName?: string;
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