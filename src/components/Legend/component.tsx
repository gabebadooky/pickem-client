import { hexCodes } from "../../utils/hexCodes";
import { LegendItem } from "./LegendItem";


const Legend = () => {
    const componentID: string = "legend-component";

    
    return (
        <div
            className="flex h-full m-auto text-xs w-full"
            id={`${componentID}-div`}
            key={`${componentID}-div`}
        >
            {hexCodes.map((hexCode) => {
                return (
                    <div className="w-1/6">
                        <LegendItem description={hexCode.description} hexCode={hexCode.hexCode} />
                    </div>
                );
            })}
        </div>
    );
}


export default Legend;