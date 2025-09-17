import { submitPick } from "../original-services/picksAPI";

import { CurrentUser } from "../types/account";
import { Game } from "../types/game";
import { Pick } from "../types/pick";
import { Token } from "../types/token";

type Props = {
	currentUser: CurrentUser;
	game: Game;
	jwtToken: Token;
	localKickoffTimestamp: Date;
	onClose: Function;
	pick: Pick;
	picks: Pick[];
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
	teamID: string;
	teamRanking: number | null;
}


const ConfidenceModal = (props: Props) => {
	const now: Date = new Date();
	const [awayTeamID, homeTeamID] = props.game.gameID.split("-at-");
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
		if (props.jwtToken.value === "guest") {
			return(<h2>Login or Register to play!</h2>);
		}
		else if (awayTeamID === props.teamID) {
			return (
				<p className="font-light">
					<span className="font-[1000]">
						{props.teamRanking !== null && `#${props.teamRanking} `}
						{formattedAwayTeamID}
					</span> over {formattedHomeTeamID}
				</p>
			);
		} else {
			return (
				<p>
					<span className="font-[1000]">
						{props.teamRanking !== null && `#${props.teamRanking} `}
						{formattedHomeTeamID}
					</span> over {formattedAwayTeamID}
				</p>
			);
		}
	}
	
	
	const selectConfidenceLevel = (confidenceWeight: string) => {
		props.setIsLoading(true);
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
		})
		.finally(() => props.setIsLoading(false));
		props.onClose();
	}


	return (
		<div className="fixed flex h-[100vh] items-center justify-center left-0 top-0 w-[100vw] z-1000">
			<div className="bg-[#D9D9D9] p-5 relative rounded-2xl text-black text-center w-[80%]">

				<div>
					<i
						className="absolute fa-solid fa-rectangle-xmark fa-2xl right-2 top-4"
						onClick={() => props.onClose()}
					>
					</i>
				</div>

				<div className="mt-2" id="confidence-modal-div">
					<h1 className="font-extrabold text-lg">Confidence Level</h1>
				</div>

				<div className="mt-5" id="game-title-div">
					{formattedGameTitle()}
				</div>

				<div className=" text-center" id="radio-buttons">

					<div className="mb-5 mt-5" id="low-confidence-pick-div">
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
							onClick={() => selectConfidenceLevel("l")}
						/>
						<label htmlFor="low" className="radioLabel">
							Low Confidence
							<br/>
							<span className="text-green-600">Reward: +1</span> 
							<span className="text-red-600"> Penalty: 0</span>
						</label>
					</div>

					<div className="mb-5 mt-5" id="low-confidence-pick-div">
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
							onClick={() => selectConfidenceLevel("m")}
						/>
						<label htmlFor="medium" className="radioLabel">
							Medium Confidence
							<br/>
							<span className="text-green-600">Reward: +3</span> 
							<span className="text-red-600"> Penalty: -2</span>
						</label>
					</div>

					<div className="mb-5 mt-5" id="low-confidence-pick-div">
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
							onClick={() => selectConfidenceLevel("h")}
						/>
						<label htmlFor="high" className="radioLabel">
							High Confidence 
							<br/>
							<span className="text-green-600">Reward: +7</span> 
							<span className="text-red-600"> Penalty: -7</span>
						</label>
					</div>

				</div>

			</div>
		</div>
	);
} 

export default ConfidenceModal;
