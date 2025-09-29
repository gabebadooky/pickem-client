import { PickConfidenceHeaderProps } from "./types";


const PickConfidenceHeader = (props: PickConfidenceHeaderProps) => {
    if (props.selectedTeam.teamID === props.awayTeam.teamID) {
        return (
            <h1 className="h-full m-auto text-center w-full">
                {props.awayTeam.teamName} {props.awayTeam.teamMascot} over {props.homeTeam.teamName} {props.homeTeam.teamMascot}
            </h1>
        );
    } else {
        return (
            <h1 className="h-full m-auto text-center w-full">
                {props.homeTeam.teamName} {props.homeTeam.teamMascot} over {props.awayTeam.teamName} {props.awayTeam.teamMascot}
            </h1>
        );
    }
}


export default PickConfidenceHeader;