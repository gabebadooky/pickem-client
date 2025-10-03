import { formattedTeamRecord } from "./component";
import { PickConfidenceHeaderProps } from "./types";


const PickConfidenceHeader = (props: PickConfidenceHeaderProps) => {
    if (props.selectedTeam.teamID === props.awayTeam.teamID) {
        return (
            <h1 className="h-full m-auto text-center w-full">
                {props.awayTeam.teamName} {props.awayTeam.teamMascot} ({`${formattedTeamRecord(props.awayTeam.overallWins, props.awayTeam.overallLosses, props.awayTeam.overallTies)}`})
                <br /> 
                over
                <br />
                {props.homeTeam.teamName} {props.homeTeam.teamMascot} ({`${formattedTeamRecord(props.homeTeam.overallWins, props.homeTeam.overallLosses, props.homeTeam.overallTies)}`})
            </h1>
        );
    } else {
        return (
            <h1 className="h-full m-auto text-center w-full">
                {props.homeTeam.teamName} {props.homeTeam.teamMascot} ({`${formattedTeamRecord(props.awayTeam.overallWins, props.awayTeam.overallLosses, props.awayTeam.overallTies)}`})
                <br />
                over
                <br />
                {props.awayTeam.teamName} {props.awayTeam.teamMascot} ({`${formattedTeamRecord(props.homeTeam.overallWins, props.homeTeam.overallLosses, props.homeTeam.overallTies)}`})
            </h1>
        );
    }
}


export default PickConfidenceHeader;