import { Team } from "../types/team";
import { espnTeamURL } from "../types/espnBaseLinks";


type Props = {
    team: Team;
    onClose: Function;
};

const TeamInfoModal = (props: Props) => {
    const espnURL: string = `${espnTeamURL}/${props.team.espnCode}`;

    return (
        <div className="bg-[#D9D9D9] px-15 max-w-xs absolute left-[40.2%] text-s" id={props.team.teamID}>
            <i className="fa-solid fa-rectangle-xmark absolute top-1 right-1" onClick={props.onClose()}></i>
            <h1>{props.team.teamName} {props.team.teamMascot}</h1>

            <br />
            <br />

            <span>
                {props.team.overallWins}-{props.team.overallLosses} ({props.team.conferenceWins}-{props.team.conferenceLosses})
                <br />
                <br />
                <a href={espnURL}>More Info (ESPN)</a>
            </span>
        </div>
    )
}

export default TeamInfoModal;