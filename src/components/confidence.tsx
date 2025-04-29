import { Pick } from "./pick";
import { submitPick } from "../services/api";

const ConfidenceModal = ({ pick }: {pick: Pick}) => {
    return (
    	<div className="modal" id="">
        	<h1>Confidence Level</h1>
        	<div id="confidenceSelection">
          		<input 
					type="radio"
					name="confidenceLevel"
					className="radioButton"
					id="low"
					value="l"
					onClick={(e) => {
						submitPick({...pick, pickWeight: e.currentTarget.value});
					}}
				/>
				<label htmlFor="l" className="radioLabel">Low</label>
				
				<input 
					type="radio"
					name="confidenceLevel"
					className="radioButton"
					id="medium"
					value="m"
					onClick={(e) => {
						submitPick({...pick, pickWeight: e.currentTarget.value});
					}}
				/>
				<label htmlFor="l" className="radioLabel">Medium</label>
				
				<input 
					type="radio"
					name="confidenceLevel"
					className="radioButton"
					id="high"
					value="h"
					onClick={(e) => {
						submitPick({...pick, pickWeight: e.currentTarget.value});
					}}
				/>
				<label htmlFor="l" className="radioLabel">High</label>
        	</div>
      	</div>
    );
}

export default ConfidenceModal;