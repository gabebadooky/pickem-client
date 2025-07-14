import { Team } from "../types/team";
import { espnTeamURL, cbsTeamURL } from "../types/baseURLs";


type Props = {
    team: Team;
    onClose: Function;
};

const TeamInfoModal = (props: Props) => {
    const espnURL: string = `${espnTeamURL}/${props.team.espnCode}`;
    const cbsURL: string = `${cbsTeamURL}/${props.team.cbsCode}`;
    const teamNotesInputId: string = `${props.team.teamID}-notes`;

    return (
        <div className="fixed flex h-[100vh] items-center justify-center left-0 rounded-sm top-0 w-[100vw] z-1000">
            <div className="bg-[#D9D9D9] p-10 relative text-black text-center" id={props.team.teamID}>
                <i className="fa-solid fa-rectangle-xmark absolute top-1 right-1" onClick={() => props.onClose()}></i>
                <h1>{props.team.teamName} {props.team.teamMascot}</h1>

                <br />

                <span>
                    {props.team.overallWins}-{props.team.overallLosses} ({props.team.conferenceWins}-{props.team.conferenceLosses})
                    <br />
                    <br />
                    <p>More Details:</p>
                    <a className="text-[#1a8cff]" href={espnURL}>ESPN</a>
                    <br />
                    <a className="text-[#1a8cff]" href={cbsURL}>CBS</a>
                </span>

                <br />

                <input type="text" name="team-notes" id={teamNotesInputId} placeholder="Team Notes" />
            </div>
        </div>
    )
}

export default TeamInfoModal;
