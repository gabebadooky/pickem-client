import { GameDayHeaderProps } from "./types";


const GameDayHeader = (props: GameDayHeaderProps) => {
    const componentID: string = `${props.formattedGameDate.replace(" ", "-")}-gameday-header`;


    return (
        <div
            className="m-auto w-full"
            id={`${componentID}-div`}
            key={`${componentID}-div`}
        >
            <h2 className="mt-[8%] text-center">{props.formattedGameDate}</h2>
            <hr className="mb-[4%] w-[90%]" />
        </div>
    );
}


export default GameDayHeader;