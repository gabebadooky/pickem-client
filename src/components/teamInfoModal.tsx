import { Team } from "../types/team";
import { espnTeamURL } from "../types/espnBaseLinks";

const TeamInfoModal = ({ team, onClose }: { team: Team, onClose: Function }) => {
    const espnURL: string = `${espnTeamURL}/${team.espnCode}`;

    return (
        <div className="bg-[#D9D9D9] px-15 max-w-xs absolute left-[40.2%] text-s" id={team.teamID}>
            <i className="fa-solid fa-rectangle-xmark absolute top-1 right-1" onClick={onClose()}></i>
            <h1>{team.teamName} {team.teamMascot}</h1>

            <br />
            <br />

            <span>
                {team.overallWins}-{team.overallLosses} ({team.conferenceWins}-{team.conferenceLosses})
                <br />
                <br />
                <a href={espnURL}>More Info (ESPN)</a>
            </span>
        </div>
    )
}

export default TeamInfoModal;