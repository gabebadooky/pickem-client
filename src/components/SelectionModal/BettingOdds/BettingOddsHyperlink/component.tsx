import { instantiateGameHyperlink } from "./component";
import { BettingOddsHyperlinkProps } from "./types";


const BettingOddsHyperlink = (props: BettingOddsHyperlinkProps) => {

    switch (props.source) {
        case "ESPN":
            return (
                <a 
                    className="text-blue-400"
                    id={`${props.componentID}-betting-odds-hyperlink`}
                    href={instantiateGameHyperlink(props.gameCode, props.league, props.source)}
                >
                    More info
                </a>
            );
        case "CBS":
            return (
                <a 
                    className="text-blue-400"
                    id={`${props.componentID}-betting-odds-hyperlink`}
                    href={instantiateGameHyperlink(props.gameCode, props.league, props.source)}
                >
                    More info
                </a>
            );
        case "FOX":
            return (
                <a 
                    className="text-blue-400"
                    id={`${props.componentID}-betting-odds-hyperlink`}
                    href={instantiateGameHyperlink(props.gameCode, props.league, props.source)}
                >
                    More info
                </a>
            );
        default:
            return <p id={`${props.componentID}-betting-odds-hyperlink`}></p>
    }

}


export default BettingOddsHyperlink;