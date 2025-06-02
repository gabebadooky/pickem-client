import { Pick } from "../types/pick";
import { submitPick } from "../services/picksAPI";
import { SelectedTeam } from "../types/selectedTeam";

type Props = {
	pick: Pick;
	teamID: string;
	picks: Pick[];
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
	selectedTeam: SelectedTeam;
    setSelectedTeam: React.Dispatch<React.SetStateAction<SelectedTeam>>;
	onClose: Function;
}

const ConfidenceModal = (props: Props) => {
	const token: string = localStorage.getItem("jwt") || "";

	const updatePicksData = (pick: Pick) => {

	}

    return (
    	<div className="bg-[#D9D9D9] text-black px-15 max-w-xs absolute left-[40.2%] text-s opacity-100">
			<i 
				className="fa-solid fa-rectangle-xmark absolute top-1 right-1" 
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
						console.log(`Submitting pick: {${token}\n${props.pick.userID}, ${props.pick.gameID}, ${props.teamID}, ${e.currentTarget.value}}`);
						submitPick(token, {
							userID: props.pick.userID,
							gameID: props.pick.gameID,
    						teamPicked: props.teamID,
							pickWeight: e.currentTarget.value
						})
						.then(() => {
							props.setPicks(prevPicks =>
								prevPicks.map(prevPick =>
									prevPick.gameID === props.pick.gameID
										&&
									prevPick.userID === props.pick.userID
										?
									{
										...prevPick, 
										teamPicked: props.teamID, 
										pickWeight: props.pick.pickWeight
									}: prevPick
								)
							);
							/*props.picks.map((prevPick: Pick) => {
								prevPick.gameID === props.pick.gameID 
									&&
								prevPick.userID === props.pick.userID
									?
								{ ...prevPick, 
									teamPicked: props.teamID, 
									pickWeight: "l"
								}: prevPick
							})*/
						})
						.then(props.onClose());
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
						console.log(`Submitting pick: {${token}\n${props.pick.userID}, ${props.pick.gameID}, ${props.pick.teamPicked}, ${e.currentTarget.value}}`);
						submitPick(token, {
							userID: props.pick.userID,
							gameID: props.pick.gameID,
    						teamPicked: props.teamID,
							pickWeight: e.currentTarget.value
						})
						.then(props.onClose());
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
						console.log(`Submitting pick: {${token}\n${props.pick.userID}, ${props.pick.gameID}, ${props.pick.teamPicked}, ${e.currentTarget.value}}`);
						submitPick(token, {
							userID: props.pick.userID,
							gameID: props.pick.gameID,
    						teamPicked: props.teamID,
							pickWeight: e.currentTarget.value
						})
						.then(props.onClose());
					}}
				/>
				<label htmlFor="l" className="radioLabel">High</label>
        	</div>
      	</div>
    );
}

export default ConfidenceModal;