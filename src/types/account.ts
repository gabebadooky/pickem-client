export type CurrentUser = {
    userID: string;
    favoriteTeam?: string;
    notificationPreference?: string;
    emailAddress?: string;
    phone?: string;
}

export type UpdateFavoriteTeamProps = {
    token: string;
    userID: string;
    favoriteTeam: string;
}

export type UpdateNotificationPreferenceProps = {
    token: string;
    userID: string;
    notificationPreference: string;
}

export type UpdateEmailAddressProps = {
    token: string;
    userID: string;
    emailAddress: string;
}

export type UpdatePhoneProps = {
    token: string;
    userID: string;
    phone: string;
}