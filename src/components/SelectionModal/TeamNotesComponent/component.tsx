import { useEffect, useState } from "react";
import SubmitButton from "../../SubmitButton/component";
import { updateTeamNotesInDatabaseAndState } from "./component";
import { TeamNotesProps } from "./types";
import { TeamNotes } from "../../../types/teamNotes";
import { callGetTeamNotesEnpdoint } from "../../../hooks/teamsEndpoints";


const TeamNotesComponent = (props: TeamNotesProps) => {
    const [notesEdited, setNotesEdited] = useState<boolean>(false);
    const [newNotes, setNewNotes] = useState<string>("");
    const [teamNotes, setTeamNotes] = useState<TeamNotes>({userID: 0, teamID: "0", notes: ""});

    const componentID: string = props.team.teamID;


    useEffect(() => {
        if (teamNotes.userID === 0) {
            callGetTeamNotesEnpdoint(props.authenticatedUser.userID)
            .then((allUserTeamNotes) => {
                setTeamNotes(
                    allUserTeamNotes.find((teamNotes) =>
                        teamNotes.userID === props.authenticatedUser.userID && 
                        teamNotes.teamID === props.team.teamID) || 
                        {userID: props.authenticatedUser.userID, teamID: props.team.teamID, notes: ""}
                );
            });
        }
    }, []);


    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setNewNotes(e.currentTarget.value);
        setNotesEdited(true);
    }


    return (
        <div
            className="h-full m-auto w-full"
            id={`${componentID}-team-notes-component`}
            key={`${componentID}-team-notes-component`}
        >

            <h1
                id={`${componentID}-team-notes-header`}
                key={`${componentID}-team-notes-header`}
            >
                {props.team.teamName} {props.team.teamMascot} Team Notes
            </h1>
            
            <div
                className="my-5"
                id={`${componentID}-team-notes-ta-div`}
                key={`${componentID}-team-notes-ta-div`}
            >
                <textarea
                    className="bg-[#FFFFFF] border-1 h-25 rounded-sm text-s w-[80%]"
                    disabled={teamNotes.userID !== props.authenticatedUser.userID}
                    defaultValue={teamNotes.notes}
                    id={`${componentID}-team-notes-text-area`}
                    key={`${componentID}-team-notes-text-area`}
                    name="team-notes-textarea"
                    onChange={(e) => handleTextAreaChange(e)}
                    placeholder="Keep your own notes on this team..."
                    rows={8}
                />

                {
                    notesEdited
                        &&
                    <div className="h-12 py-2">
                        <SubmitButton
                            buttonInnerText="Update Team Notes"
                            parentComponentID={`${teamNotes.teamID}-update-team-notes`}
                            submitMethod={() => updateTeamNotesInDatabaseAndState(newNotes, props.authenticatedUser.userID, props.team.teamID, setNewNotes, setNotesEdited)}
                        />
                    </div>
                }
            </div>

        </div>
    );
}


export default TeamNotesComponent;