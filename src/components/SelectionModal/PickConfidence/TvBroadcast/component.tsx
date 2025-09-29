import { TvBroadcastProps } from "./types";


const TvBroadcast = (props: TvBroadcastProps) => {
    const componentID: string = `${props.game.gameID}-tv-broadcast`;


    return (
        <div
            className="h-full m-auto text-center w-full"
            id={`${componentID}-div`}
            key={`${componentID}-div`}
        >
            {
                props.game.tvCoverage.length > 1
                    ?
                <h3
                    id={`${componentID}-header`}
                    key={`${componentID}-header`}
                >
                    Broadcast: {props.game.tvCoverage}
                </h3>
                    :
                <h3
                    id={`${componentID}-header`}
                    key={`${componentID}-header`}
                >
                    Broadcast: N/A
                </h3>
            }
        </div>
    );
}


export default TvBroadcast;