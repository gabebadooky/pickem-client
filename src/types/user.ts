type NotificationPreferenceInputValue = "n" | "e" | "p";

export interface User {
    username: string;
    password: string;
    favoriteTeam?: string;
    notificationPreference?: NotificationPreferenceInputValue;
    emailAddress?: string;
    phone?: string;
}