import { HexCode } from "../../types/HexCode";


export const LegendItem = (props: HexCode) => {
    const componentID: string = `${props.description}-${props.hexCode}-option`;

    
    return (
        <div
            className={`bg-radial from-[${props.hexCode}] h-full m-auto px-1 text-center to-[#1E1E1E] w-full`}
            id={`${componentID}-div`}
            key={`${componentID}-div`}
            style={{ backgroundColor: props.hexCode }}
        >
            {props.description}
        </div>
    );
}