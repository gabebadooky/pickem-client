import { jwtDecode, JwtHeader } from "jwt-decode";
import { Pick } from "../types/pick";
import { submitPick } from "../services/picksAPI";

type Props = {
	pick: Pick;
	teamID: string;
	picks: Pick[];
	localKickoffTimestamp: Date;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    setSelectedTeam: React.Dispatch<React.SetStateAction<string | null>>;
	onClose: Function;
}

const ConfidenceModal = (props: Props) => {
	const now = new Date();
	const token: string = localStorage.getItem("jwt") || "";
	const decodedToken: JwtHeader = jwtDecode(token);
	let identity = decodedToken.sub || decodedToken.id;
	
	const formattedGameID: string = props.pick.gameID
										.replace(/-/g, " ")
										.split(" ")
										.map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1))
										.join(" ");
	
	const disableRadioAttribute: boolean = identity !== props.pick.userID.toString() || now > props.localKickoffTimestamp;
	console.log(`disableRadioAttribute: ${disableRadioAttribute}`);
	
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
    	<div className="fixed flex h-[100vh] items-center justify-center left-0 top-0 w-[100vw] z-1000">
			<div className="bg-[#D9D9D9] p-10 relative rounded-lg text-black text-center">
				
				<i 
					className="absolute fa-solid fa-rectangle-xmark right-1 top-1"
					onClick={() => props.onClose()}
				>
				</i>

				<h1>Confidence Level</h1>

				<br />

				<p>{formattedGameID}</p>

				<br />

				<div className="" id="confidenceSelection">
					<input 
						type="radio"
						name="confidenceLevel"
						className="ml-1"
						disabled={disableRadioAttribute}
						id="low"
						value="l"
						checked={props.pick.teamPicked === props.teamID && props.pick.pickWeight == "l"}
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
					<label htmlFor="low" className="radioLabel">Low</label>
					
					<br />

					<input 
						type="radio"
						name="confidenceLevel"
						className="ml-1"
						disabled={disableRadioAttribute}
						id="medium"
						value="m"
						checked={props.pick.teamPicked === props.teamID && props.pick.pickWeight == "m"}
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
						className="ml-1"
						disabled={disableRadioAttribute}
						id="high"
						value="h"
						checked={props.pick.teamPicked === props.teamID && props.pick.pickWeight == "h"}
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
		</div>
    );
}

export default ConfidenceModal;
