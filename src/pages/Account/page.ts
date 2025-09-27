import { callUpdateDisplayNameEndpoint, callUpdateFavoriteTeamEndpoint, callUpdateDefaultGameModeEndpoint } from "../../hooks/userEndpoints";
import { League } from "../../types/league";


export const updateAccountFavoriteTeam = (jwtToken: string | undefined, userID: number, favoriteTeam: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>): void => {
    setIsLoading(true);
    
    if (!jwtToken) {
        alert("Current authenticated session expired. Please sign back in!");

    } else {
        callUpdateFavoriteTeamEndpoint({
            token: jwtToken, 
            userID: userID, 
            favoriteTeam: favoriteTeam || "0"
        })
        .then(() => {
            setIsLoading(false);
            alert(`Favorite team successfully updated!`);
        })
        .catch(() => {
            setIsLoading(false);
            alert("Error occurred updating favorite team. Please try again and tell the developer he sucks 🙃");
        });

    }
    
}


export const updateAccountDisplayName = (jwtToken: string | undefined, userID: number, displayName: string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>): void => {
    setIsLoading(true);
    
    if (!jwtToken) {
        alert("Current authenticated session expired. Please sign back in!");

    } else {
        callUpdateDisplayNameEndpoint({
            token: jwtToken, 
            userID: userID, 
            displayName: displayName || ""
        })
        .then(() => {
            setIsLoading(false);
            alert(`Display Name successfully updated!`);
        })
        .catch(() => {
            setIsLoading(false);
            alert("Error occurred updating display name. Please try again and tell the developer he sucks 🙃");
        });

    }
    
}


export const updateAccountDefaultGameMode = (jwtToken: string | undefined, userID: number, defaultGameMode: League, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>): void => {
    setIsLoading(true);
    
    if (!jwtToken) {
        alert("Current authenticated session expired. Please sign back in!");

    } else {
        callUpdateDefaultGameModeEndpoint({
            token: jwtToken, 
            userID: userID, 
            defaultGameMode: defaultGameMode
        })
        .then(() => {
            setIsLoading(false);
            alert(`Preferred game mode successfully updated!`);
        })
        .catch(() => {
            setIsLoading(false);
            alert("Error occurred updating preferred game mode. Please try again and tell the developer he sucks 🙃");
        });

    }
    
}