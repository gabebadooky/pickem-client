import { useState } from "react";

type notificationPreferences = "Phone" | "Email" | "None";

interface User {
    username: string;
    favoriteTeam: string;
    notificationPreference: notificationPreferences;
    emailAddress: string;
    phone: string;
}

const user: User = {
    username: 'gbtest1',
    favoriteTeam: 'arizona-state-sun-devils',
    notificationPreference: 'Phone',
    emailAddress: 'baduquig@gmail.com',
    phone: '4804331773'
}

const UsernameField = () => {
    return (
        <input type="text" disabled placeholder={user.username} />
    )
}

const NotificationPreferenceField = () => {
    const [isModified, setIsModified] = useState(false);
    const toggleModified = () => {
        setIsModified(true);
    };

    return (
        <select 
            name="notificationPreference" 
            id="notificationPreferenceDropdown"
            onChange={toggleModified}
        >
            <option defaultChecked value="N">No Thanks</option>
            <option value="E">Email</option>
            <option value="P">Text Message</option>
        </select>
    )
}

const EmailAddressField = () => {
    return (
        <input type="text" value={user.emailAddress} />
    )
}

const PhoneNumberField = () => {
    return (
        <input type="text" value={user.phone} />
    )
}

const AccountInfo = () => {
    return (
        <div>

        </div>
    )
}

export default AccountInfo;