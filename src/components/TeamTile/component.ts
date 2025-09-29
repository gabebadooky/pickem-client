import { TeamTileProps } from "./types";


export const setLogoImageStyling = (props: TeamTileProps): string => {
    // default cell styling
    let cellStyling: string = "h-full m-auto opacity-25 w-full";


    if (props.pick.teamPicked === props.tileTeam.teamID) {
        if (props.game.gameFinished) {
            // Pick made and Game is finished
            if (
                (props.game.awayTeamID === props.tileTeam.teamID && props.game.awayTotalBoxScore > props.game.homeTotalBoxScore)
                    ||
                (props.game.homeTeamID === props.tileTeam.teamID && props.game.awayTotalBoxScore < props.game.homeTotalBoxScore)
            ) {
                // Game Finished and Pick is Correct
                cellStyling = "bg-radial from-[#08e63a] h-full m-auto rounded-3xl to-[#1E1E1E] w-full";
            } else {
                // Game Finished and Pick is Incorrect
                cellStyling = "bg-radial from-[#bb4343] h-full m-auto rounded-3xl to-[#1E1E1E] w-full";
            }
        } else {
            cellStyling = `bg-radial from-[20%] from-[#FAFAFA] border-5 h-full rounded-3xl w-full`;
        }
    }

    return cellStyling;
}


export const setOuterBorder = (props: TeamTileProps): string => {
    if ((props.pick.teamPicked === props.tileTeam.teamID) && (!props.game.gameFinished)) {
        return `border-2 rounded-3xl`;
    } else {
        return "border-[#1E1E1E]";
    }
}