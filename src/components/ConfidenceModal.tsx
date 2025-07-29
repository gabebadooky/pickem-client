import { submitPick } from "../services/picksAPI";

import { CurrentUser } from "../types/account";
import { Pick } from "../types/pick";
import { Token } from "../types/token";

type Props = {
	currentUser: CurrentUser;
	jwtToken: Token;
	localKickoffTimestamp: Date;
	onClose: Function;
	pick: Pick;
	picks: Pick[];
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
	teamID: string;
}


const ConfidenceModal = (props: Props) => {
	const now: Date = new Date();
	const [awayTeamID, homeTeamID] = props.pick.gameID.split("-at-");
	const formattedAwayTeamID: string = awayTeamID
										.replace(/-/g, " ")
										.split(" ")
										.map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1))
										.join(" ");
	const formattedHomeTeamID: string = homeTeamID
										.replace(/-/g, " ")
										.split(" ")
										.map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1))
										.join(" ");
	const modifyPickAllowed: boolean = props.jwtToken.active && props.currentUser.userID === props.pick.userID && now < props.localKickoffTimestamp;


	const formattedGameTitle = () => {
		if (awayTeamID === props.teamID) {
			return (
				<p className="font-light">
					<span className="font-[1000]">{formattedAwayTeamID}</span> over {formattedHomeTeamID}
				</p>
			);
		} else {
			return (
				<p>
					<span className="font-[1000]">{formattedHomeTeamID}</span> over {formattedAwayTeamID}
				</p>
			);
		}
	}
	
	
	const selectConfidenceLevel = (confidenceWeight: string) => {
		submitPick(props.jwtToken.value, {
			userID: props.pick.userID,
			gameID: props.pick.gameID,
			teamPicked: props.teamID,
			pickWeight: confidenceWeight
		})
		.then(() => {
			props.setPicks(props.picks.map(pick =>
				pick.gameID === props.pick.gameID
					&&
				pick.userID === props.pick.userID
					?
				{ ...pick, 
					teamPicked: props.teamID, 
					pickWeight: confidenceWeight 
				} : pick
			));
		});
		props.onClose();
	}


	return (
		<div className="fixed flex h-[100vh] items-center justify-center left-0 top-0 w-[100vw] z-1000">
			<div className="bg-[#D9D9D9] p-5 relative rounded-xl text-black text-center w-[80%]">

				<i
					className="absolute fa-solid fa-rectangle-xmark fa-xl right-2 top-4"
					onClick={() => props.onClose()}
				>
				</i>

				<div id="confidence-modal-div">
					<h1 className="font-extrabold text-lg">Confidence Level</h1>
				</div>

				<div className="mt-5" id="game-title-div">
					{formattedGameTitle()}
				</div>

				<div className=" text-center" id="radio-buttons">

					<div className="mb-4 mt-4" id="low-confidence-pick-div">
						<input 
							type="radio"
							name="confidence-level"
							disabled={!modifyPickAllowed}
							id="low"
							value="l"
							defaultChecked={
								props.pick.teamPicked === props.teamID 
								&& props.pick.pickWeight === "l"
							}
							onClick={(e) => selectConfidenceLevel(e.currentTarget.value)}
						/>
						<label htmlFor="low" className="radioLabel">
							Low Confidence
							<br/>
							<span className="text-green-600">Reward: +2 </span> 
							<span className="text-red-600"> Penalty: 0</span>
						</label>
					</div>

					<div className="mb-4 mt-4" id="low-confidence-pick-div">
						<input 
							type="radio"
							name="confidence-level"
							disabled={!modifyPickAllowed}
							id="medium"
							value="m"
							defaultChecked={
								props.pick.teamPicked === props.teamID 
								&& props.pick.pickWeight === "m"
							}
							onClick={(e) => selectConfidenceLevel(e.currentTarget.value)}
						/>
						<label htmlFor="low" className="radioLabel">
							Medium Confidence
							<br/>
							<span className="text-green-600">Reward: +5 </span> 
							<span className="text-red-600"> Penalty: -2</span>
						</label>
					</div>

					<div className="mb-4 mt-4" id="low-confidence-pick-div">
						<input 
							type="radio"
							name="confidence-level"
							disabled={!modifyPickAllowed}
							id="high"
							value="h"
							defaultChecked={
								props.pick.teamPicked === props.teamID 
								&& props.pick.pickWeight === "h"
							}
							onClick={(e) => selectConfidenceLevel(e.currentTarget.value)}
						/>
						<label htmlFor="low" className="radioLabel">
							High Confidence 
							<br/>
							<span className="text-green-600">Reward: +10 </span> 
							<span className="text-red-600"> Penalty: -10</span>
						</label>
					</div>

				</div>

			</div>
		</div>
	);
} 

export default ConfidenceModal;

























/*
const originalConfidenceModal = (props: Props) => {
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
						name="confidence-level"
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

*/