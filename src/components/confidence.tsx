import { Pick } from "../types/pick";
import { submitPick } from "../services/picksAPI";

const ConfidenceModal = ({ pick, onClose }: {pick: Pick, onClose: Function}) => {
    return (
    	<div className="modal" id="">
			<button onClick={() => onClose()} >x</button>
        	<h1>Confidence Level</h1>
        	<div id="confidenceSelection">
          		<input 
					type="radio"
					name="confidenceLevel"
					className="radioButton"
					id="low"
					value="l"
					onClick={(e) => {
						submitPick({...pick, pickWeight: e.currentTarget.value})
						.then(onClose());;
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
						submitPick({...pick, pickWeight: e.currentTarget.value})
						.then(onClose());;
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
						submitPick({...pick, pickWeight: e.currentTarget.value})
						.then(onClose());
					}}
				/>
				<label htmlFor="l" className="radioLabel">High</label>
        	</div>
      	</div>
    );
}

export default ConfidenceModal;