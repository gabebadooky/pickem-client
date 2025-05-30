export interface Pick {
    gameID: string;
    userID: number;
    teamPicked: string;
    pickWeight: string;
}


export const NullPick: Pick  ={
    gameID: "",
    userID: 0,
    teamPicked: "",
    pickWeight: ""
}