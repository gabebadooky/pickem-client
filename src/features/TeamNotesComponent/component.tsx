import { useState } from "react";
import SubmitButton from "../../new-components/SubmitButton";
import { updateTeamNotesInDatabaseAndState } from "./utils";
import { ComponentProps } from "./types";


const TeamNotesComponent = (props: ComponentProps) => {
    const [notesEdited, setNotesEdited] = useState<boolean>(false);
    const [newNotes, setNewNotes] = useState<string>("");
    const componentID: string = props.team.teamID;


    return (
        <div
            className="h-full m-auto w-full"
            id={`${componentID}-team-notes-component`}
            key={`${componentID}-team-notes-component`}
        >
            
            <textarea
                className="bg-[#FFFFFF] h-25 rounded-sm text-s w-[80%]"
                disabled={props.teamNotes.userID !== props.authenticatedUser.userID}
                defaultValue={props.teamNotes.notes}
                id={`${componentID}-team-notes-text-area`}
                key={`${componentID}-team-notes-text-area`}
                name="team-notes-textarea"
                onChange={(e) => {
                    setNewNotes(e.currentTarget.value);
                    setNotesEdited(true);
                }}
                placeholder="Keep your own notes on this team..."
            />

            {
                notesEdited
                    &&
                <div className="py-2">
                    <SubmitButton
                        buttonInnerText="Update Team Notes"
                        parentComponentID={`${props.teamNotes.teamID}-update-team-notes`}
                        submitMethod={updateTeamNotesInDatabaseAndState(newNotes, props)}
                    />
                </div>
            }

        </div>
    );
}


export default TeamNotesComponent;