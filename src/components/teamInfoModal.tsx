import { Team } from "../types/team";
import { espnTeamURL } from "../types/espnBaseLinks";


type Props = {
    team: Team;
    onClose: Function;
};

const TeamInfoModal = (props: Props) => {
    const espnURL: string = `${espnTeamURL}/${props.team.espnCode}`;

    return (
        <div className="fixed flex h-[100vh] items-center justify-center left-0 top-0 w-[100vw] z-1000">
            <div className="bg-[#D9D9D9] p-10 relative text-black text-center" id={props.team.teamID}>
                <i className="fa-solid fa-rectangle-xmark absolute top-1 right-1" onClick={() => props.onClose()}></i>
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
        </div>
    )
}

export default TeamInfoModal;