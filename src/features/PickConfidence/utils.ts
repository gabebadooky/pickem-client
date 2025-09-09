

const formatTeamID = (teamID: string): string => {
    const formattedTeamID: string = teamID
                                    .replace(/-/g, " ")
                                    .split(" ")
                                    .map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1))
                                    .join(" ");
    return formattedTeamID;
}