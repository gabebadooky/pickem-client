import { TeamInfoProp } from "../types/teamInfoProp";
import { espnTeamURL } from "../types/espnBaseLinks";

const TeamInfoModal = ({ teamInfo }: { teamInfo: TeamInfoProp }) => {
    const espnURL: string = `${espnTeamURL}/${teamInfo}`;

    return (
        <div className="bg-[#D9D9D9] px-15 max-w-xs absolute left-[40.2%] text-s" id={teamInfo.team.teamID}>
            <i className="fa-solid fa-rectangle-xmark absolute top-1 right-1" onClick={teamInfo.onClose()}></i>
            <h1>{teamInfo.team.teamName} {teamInfo.team.teamMascot}</h1>

            <br />
            <br />

            <span>
                {teamInfo.team.overallWins}-{teamInfo.team.overallLosses} ({teamInfo.team.conferenceWins}-{teamInfo.team.conferenceLosses})
                <br />
                <br />
                <a href={espnURL}>More Info (ESPN)</a>
            </span>
        </div>
    )
}

export default TeamInfoModal;