import { Pick } from "../types/pick";
import { submitPick } from "../services/picksAPI";

const ConfidenceModal = ({ pick, onClose }: {pick: Pick, onClose: Function }) => {
	const token: string = localStorage.getItem("jwt") || "";

    return (
    	<div className="bg-[#D9D9D9] px-15 max-w-xs absolute left-[40.2%] text-s" id="">
			<i className="fa-solid fa-rectangle-xmark absolute top-1 right-1" onClick={() => onClose()}></i>
        	<h1>Confidence Level</h1>
        	<div className="" id="confidenceSelection">
          		<input 
					type="radio"
					name="confidenceLevel"
					className="mr-1"
					id="low"
					value="l"
					onClick={(e) => {
						//submitPick({...pick, pickWeight: e.currentTarget.value})
						console.log(`Submitting pick: {${token}\n${pick.userID}, ${pick.gameID}, ${pick.teamPicked}, ${e.currentTarget.value}}`);
						submitPick(token, {
							userID: pick.userID,
							gameID: pick.gameID,
    						teamPicked: pick.teamPicked,
							pickWeight: e.currentTarget.value
						})
						.then(onClose());;
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
						//submitPick({...pick, pickWeight: e.currentTarget.value})
						console.log(`Submitting pick: {${token}\n${pick.userID}, ${pick.gameID}, ${pick.teamPicked}, ${e.currentTarget.value}}`);
						submitPick(token, {
							userID: pick.userID,
							gameID: pick.gameID,
    						teamPicked: pick.teamPicked,
							pickWeight: e.currentTarget.value
						})
						.then(onClose());;
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
						//submitPick({...pick, pickWeight: e.currentTarget.value})
						console.log(`Submitting pick: {${token}\n${pick.userID}, ${pick.gameID}, ${pick.teamPicked}, ${e.currentTarget.value}}`);
						submitPick(token, {
							userID: pick.userID,
							gameID: pick.gameID,
    						teamPicked: pick.teamPicked,
							pickWeight: e.currentTarget.value
						})
						.then(onClose());
					}}
				/>
				<label htmlFor="l" className="radioLabel">High</label>
        	</div>
      	</div>
    );
}

export default ConfidenceModal;