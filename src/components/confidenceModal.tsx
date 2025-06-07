import { Pick } from "../types/pick";
import { submitPick } from "../services/picksAPI";

type Props = {
	pick: Pick;
	teamID: string;
	picks: Pick[];
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    setSelectedTeam: React.Dispatch<React.SetStateAction<string | null>>;
	onClose: Function;
}

const ConfidenceModal = (props: Props) => {
	const token: string = localStorage.getItem("jwt") || "";

	const resetPicks = (pickWeightInputvalue: string) => {
		props.setPicks(props.picks.map(pick =>
			pick.gameID === props.pick.gameID
				&&
			pick.userID === props.pick.userID
				?
			{ ...pick, 
				teamPicked: props.teamID, 
				pickWeight: pickWeightInputvalue 
			} : pick
		));
		console.log(`Updated Pick: ${props.teamID}, "${pickWeightInputvalue}"`);
	}

    return (
    	<div className="bg-[#D9D9D9] text-black max-w-xs text-s opacity-100">
			<i 
				className="fa-solid fa-rectangle-xmark" 
				onClick={() => props.onClose()}
			>
			</i>

        	<h1>Confidence Level</h1>
        	<div className="" id="confidenceSelection">
          		<input 
					type="radio"
					name="confidenceLevel"
					className="mr-1"
					id="low"
					value="l"
					onClick={(e) => {
						const pickWeightInputvalue: string = e.currentTarget.value;
						submitPick(token, {
							userID: props.pick.userID,
							gameID: props.pick.gameID,
    						teamPicked: props.teamID,
							pickWeight: e.currentTarget.value
						})
						.then(() => {
							resetPicks(pickWeightInputvalue);
							props.setSelectedTeam(props.teamID);
							props.onClose();
						});
					}}
				/>
				<label htmlFor="l" className="radioLabel">Low</label>
				
				<br />

				<input 
					type="radio"
					name="confidenceLevel"
					className="mr-1"
					id="medium"
					value="m"
					onClick={(e) => {
						const pickWeightInputvalue: string = e.currentTarget.value;
						console.log(`Submitting pick: {${token}\n${props.pick.userID}, ${props.pick.gameID}, ${props.pick.teamPicked}, ${e.currentTarget.value}}`);
						submitPick(token, {
							userID: props.pick.userID,
							gameID: props.pick.gameID,
    						teamPicked: props.teamID,
							pickWeight: e.currentTarget.value
						})
						.then(() => {
							resetPicks(pickWeightInputvalue);
							props.setSelectedTeam(props.teamID);
							props.onClose();
						});
					}}
				/>
				<label htmlFor="l" className="radioLabel">Medium</label>
				
				<br />

				<input 
					type="radio"
					name="confidenceLevel"
					className="mr-1"
					id="high"
					value="h"
					onClick={(e) => {
						const pickWeightInputvalue: string = e.currentTarget.value;
						console.log(`Submitting pick: {${token}\n${props.pick.userID}, ${props.pick.gameID}, ${props.pick.teamPicked}, ${e.currentTarget.value}}`);
						submitPick(token, {
							userID: props.pick.userID,
							gameID: props.pick.gameID,
    						teamPicked: props.teamID,
							pickWeight: e.currentTarget.value
						})
						.then(() => {
							resetPicks(pickWeightInputvalue);
							props.setSelectedTeam(props.teamID);
							props.onClose();
						});
					}}
				/>
				<label htmlFor="l" className="radioLabel">High</label>
        	</div>
      	</div>
    );
}

export default ConfidenceModal;