import { PickConfidenceHeaderProps } from "./types";


const PickConfidenceHeader = (props: PickConfidenceHeaderProps) => {
    if (props.selectedTeam.teamID === props.awayTeam.teamID) {
        return <h1>{props.awayTeam.teamName} {props.awayTeam.teamMascot} over {props.homeTeam.teamName} {props.homeTeam.teamMascot}</h1>
    } else {
        return <h1>{props.homeTeam.teamName} {props.homeTeam.teamMascot} over {props.awayTeam.teamName} {props.awayTeam.teamMascot}</h1>
    }
}


export default PickConfidenceHeader;