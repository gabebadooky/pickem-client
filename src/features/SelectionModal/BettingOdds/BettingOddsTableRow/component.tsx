import { BettingOddsTableRowProps } from "./types";


const BettingOddTableRow = (props: BettingOddsTableRowProps) => {
    const componentID: string = `${props.parentComponentID}-${props.label.replace("/", "-").toLowerCase()}`;

    return (
        <tr className="w-full" id={componentID} key={componentID}>
            <td
                className="text-left w-[50%]"
                id={`${componentID}-label`}
                key={`${componentID}-label`}
            >
                {props.label}
            </td>
            
            <td
                className="text-right w-[50%]"
                id={`${componentID}-value`}
                key={`${componentID}-value`}
            >
                {props.value}
            </td>
        </tr>
    );
}


export default BettingOddTableRow;