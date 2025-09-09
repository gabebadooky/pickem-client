import { TableRowProps } from "../types";


const BettingOddTableRow = (props: TableRowProps) => {
    const componentID: string = `${props.parentComponentID}-${props.label.replace("/", "-").toLowerCase()}`;

    return (
        <tr id={componentID} key={componentID}>
            <td
                className="text-left"
                id={`${componentID}-label`}
                key={`${componentID}-label`}
            >
                {props.label}
            </td>
            
            <td
                className="text-right"
                id={`${componentID}-value`}
                key={`${componentID}-value`}
            >
                {props.value}
            </td>
        </tr>
    );
}


export default BettingOddTableRow;