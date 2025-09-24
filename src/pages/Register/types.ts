export type NewUserProperties = {
    username: string | undefined;
    password: string | undefined;
    displayName: string | undefined;
    favoriteTeam: string | undefined;
    notificationPreference: string;
    emailAddress: string;
    phone: string;
}


export type RegisterAttemptResponses = "Success" | "Existing" | "Error";