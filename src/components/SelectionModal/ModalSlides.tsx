import { BettingOdds } from "./BettingOdds";
import { instantiateTeamNotes } from "./utils";
import { PickConfidence } from "./PickConfidence";
import { SelectionModalProps } from "./types";
import { TeamNotesComponent } from "./TeamNotesComponent";
import { TeamSchedule } from "./TeamSchedule";



export const ModalSlides = (props: SelectionModalProps) => [
        
    <PickConfidence
        allPicks={props.allPicks}
        awayTeam={props.awayTeam}
        authenticatedUser={props.authenticatedUser}
        game={props.game}
        homeTeam={props.homeTeam}
        pick={props.pick}
        selectedTeam={props.selectedTeam}
        setIsModalOpen={props.setIsModalOpen}
        setPicks={props.setPicks}
    />,

    <TeamNotesComponent
        allTeamNotes={props.allTeamsNotes}
        authenticatedUser={props.authenticatedUser}
        setTeamNotes={props.setTeamNotes}
        team={props.selectedTeam}
        teamNotes={instantiateTeamNotes(props.allTeamsNotes, props.authenticatedUser.userID, props.selectedTeam.teamID)}
    />,

    <BettingOdds
        awayTeam={props.awayTeam}
        game={props.game}
        homeTeam={props.homeTeam}
        selectedTeamID={props.selectedTeam.teamID}
        source="ESPN"
    />,

    <BettingOdds
        awayTeam={props.awayTeam}
        game={props.game}
        homeTeam={props.homeTeam}
        selectedTeamID={props.selectedTeam.teamID}
        source="CBS"
    />,

    <BettingOdds
        awayTeam={props.awayTeam}
        game={props.game}
        homeTeam={props.homeTeam}
        selectedTeamID={props.selectedTeam.teamID}
        source="FOX"
    />,

    <TeamSchedule
        allGames={props.allGames}
        allTeams={props.allTeams}
        team={props.awayTeam}
    />,

    <TeamSchedule
        allGames={props.allGames}
        allTeams={props.allTeams}
        team={props.homeTeam}
    />

];