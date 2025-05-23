export interface Pick {
    gameID: string;
    userID: string;
    teamPicked: string;
    pickWeight: string;
}


export const NullPick: Pick  ={
    gameID: "",
    userID: "",
    teamPicked: "",
    pickWeight: ""
}