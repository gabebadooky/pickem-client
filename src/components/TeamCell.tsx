import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import ConfidenceModal from "./ConfidenceModal";
import { CurrentUser } from "../types/account";
import { Game } from "../types/game";
import { Pick } from "../types/pick";
import { Team } from "../types/team";
import { Token } from "../types/token";


type Props = {
	currentUser: CurrentUser;
    game: Game;
    isModalCurrentlyRendered: boolean;
	jwtToken: Token;
    localKickoffTimestamp: Date;
    pick: Pick;
    picks: Pick[];
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setIsModalCurrentlyRendered: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
    team: Team;
}


const TeamCell = (props: Props) => {
    const [borderColorStyle, setBorderColorStyle] = useState<string | undefined>(undefined);
    const [cellBorder, setCellBorder] = useState<string | undefined>(undefined);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [tailwindStyling, setTailwindStyling] = useState<string>("h-[100%] opacity-25");
    const teamImageID: string = `${props.team.teamID}-img`;

    useEffect(() => {
        setCellBorder("h-[100%] m-auto w-1/3");
        if (props.game.gameFinished) {
            if (props.team.teamID === props.pick.teamPicked) {
                //setBorderColorStyle(`#${props.team.primaryColor}`);
                //setCellBorder("border-1 h-[100%] m-auto rounded-2xl w-1/3");
                if (
                    (props.game.awayTeamID === props.team.teamID && props.game.awayTotalBoxScore < props.game.homeTotalBoxScore)
                        ||
                    (props.game.homeTeamID === props.team.teamID && props.game.awayTotalBoxScore > props.game.homeTotalBoxScore)
                ) {
                    setTailwindStyling("bg-radial from-[#efea1a] to-[#1E1E1E");
                } else {
                    setTailwindStyling("bg-radial from-[#bb4343] to-[#1E1E1E");
                }
            } else {
                setTailwindStyling("opacity-25");
                setBorderColorStyle(undefined);
                setCellBorder("h-[100%] m-auto w-1/3");
            } 
            
        } else {
            if (props.team.teamID === props.pick.teamPicked) {
                setTailwindStyling("bg-[#fafafa] border-5 rounded-2xl");
                /*if (props.game.gameFinished) {
                    setTailwindStyling("border-5 rounded-2xl");
                } else {
                    setTailwindStyling("bg-[#fafafa] border-5 rounded-2xl");
                }*/
                setBorderColorStyle(`#${props.team.primaryColor}`);
                setCellBorder("border-1 h-[100%] m-auto rounded-2xl w-1/3");
            } else {
                setTailwindStyling("opacity-25");
                setBorderColorStyle(undefined);
                setCellBorder("h-[100%] m-auto w-1/3");
            }
        }
    }, [props.picks]);


    return (
        <td className={cellBorder} style={{borderColor: `#${props.team.alternateColor}`}}>
            <img
                key={teamImageID}
                src={props.team.teamLogoUrl}
                alt={props.team.teamName}
                className={tailwindStyling}
                style={{borderColor: borderColorStyle}}
                onClick={() => {
                    if (!props.isModalCurrentlyRendered) {
                        props.setIsModalCurrentlyRendered(true);
                        setShowModal(true);
                    }
                }}
            />
            {
                showModal 
                    && 
                (createPortal(
                    <ConfidenceModal
                        currentUser={props.currentUser}
                        game={props.game}
                        jwtToken={props.jwtToken}
                        localKickoffTimestamp={props.localKickoffTimestamp}
                        setIsLoading={props.setIsLoading}
                        setPicks={props.setPicks}
                        pick={props.pick}
                        picks={props.picks}
                        teamID={props.team.teamID}
                        teamRanking={props.team.ranking}
                        onClose={() => {
                            props.setIsModalCurrentlyRendered(false);
                            setShowModal(false);
                        }}
                    />,
                    document.body
                ))
            }
        </td>
    );

}


export default TeamCell;
