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
        if (props.team.teamID === props.pick.teamPicked) {
            setTailwindStyling(`bg-[#d8cdcd] border-8 rounded-2xl`);
            setBorderColorStyle(`#${props.team.primaryColor}`);
            setCellBorder(`border-[#d8cdcd] border-2 h-[100%] m-auto rounded-2xl w-1/3`);
        } else {
            setTailwindStyling("opacity-25");
            setBorderColorStyle(undefined);
            setCellBorder("h-[100%] m-auto w-1/3");
        }
    }, [props.picks]);


    return (
        <td className={cellBorder}>
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






















/*
const originalTeamCell = (props: Props) => {
    const teamImage: string = `${props.team.teamID}-img`;
    const [imageBorder, setImageBorder] = useState<string>("h-[100%]");
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        if (props.team.teamID === props.selectedTeam || props.team.teamID === props.pick.teamPicked) {
            setImageBorder(`border-3 h-[100%] rounded-2xl`);
        } else {
            setImageBorder("h-[100%] opacity-25");
        }
    }, [props.team.teamID, props.pick.teamPicked, props.selectedTeam, props.team.alternateColor]);
    

    return (
        <td className="m-auto w-1/5">
            <img
                key={teamImage}
                src={props.team.teamLogoUrl}
                alt={props.team.teamName}
                className={imageBorder}
                style={props.team.teamID === props.selectedTeam || props.team.teamID === props.pick.teamPicked ? {borderColor: `#${props.team.alternateColor}`} : undefined}
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
                        pick={props.pick}
                        teamID={props.team.teamID}
                        picks={props.picks}
                        localKickoffTimestamp={props.localKickoffTimestamp}
                        setPicks={props.setPicks}
                        setSelectedTeam={props.setSelectedTeam}
                        onClose={() => {
                            props.setIsModalCurrentlyRendered(false);
                            setShowModal(false);
                        }}
                    />,
                    document.body
                ))
            }
        </td>
    )
}
*/
