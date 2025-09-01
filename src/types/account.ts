export type CurrentUser = {
    userID: number;
    username: string;
    displayName?: string;
    favoriteTeam?: string;
    notificationPreference?: string;
    emailAddress?: string;
    phone?: string;
}

export type UpdateDisplayNameProps = {
    token: string;
    userID: number;
    displayName: string;
}

export type UpdateFavoriteTeamProps = {
    token: string;
    userID: number;
    favoriteTeam: string;
}

export type UpdateNotificationPreferenceProps = {
    token: string;
    userID: number;
    notificationPreference: string;
}

export type UpdateEmailAddressProps = {
    token: string;
    userID: number;
    emailAddress: string;
}

export type UpdatePhoneProps = {
    token: string;
    userID: number;
    phone: string;
}