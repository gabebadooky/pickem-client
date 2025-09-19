import { Pick } from "../../types/pick";
import { NullTeam, Team } from "../../types/team";
import { GameDayHeader } from "../GameDayHeader";
import { Matchup } from "../Matchup";
import { instantiateFormattedGameDate } from "./components";
import { MatchupsContainerProps } from "./types";


const MatchupsContainer = (props: MatchupsContainerProps) => {
    let distinctGameDate: string;

    return (
        <div className="m-auto w-full" id="picks-page-matchups-div">
            {props.allGames.map((currentGame) => {
                const formattedGameDate: string = instantiateFormattedGameDate(currentGame.date, currentGame.time);
                const awayTeam: Team = props.allTeams.find((currentTeam) => currentTeam.teamID === currentGame.awayTeamID) || NullTeam;
                const homeTeam: Team = props.allTeams.find((currentTeam) => currentTeam.teamID === currentGame.homeTeamID) || NullTeam;
                const pick: Pick = props.allPicks.find((currentPick) => currentPick.userID === props.userFilter && currentPick.gameID === currentGame.gameID) || {userID: -1, gameID: "na", teamPicked: "", pickWeight: ""};
                
                if (distinctGameDate !== formattedGameDate) {
                    // Render "Weekday MM/DD" Game Day header for distinct game date in week
                    distinctGameDate = formattedGameDate;
                    return (
                        <>
                            <GameDayHeader formattedGameDate={formattedGameDate} />
                            <Matchup
                                key={`${currentGame.gameID}-matchup-component`}
                                allGames={props.allGames}
                                allPicks={props.allPicks}
                                allTeams={props.allTeams}
                                authenticatedUser={props.authenticatedUser}
                                awayTeam={awayTeam}
                                game={currentGame}
                                homeTeam={homeTeam}
                                isModalOpen={props.isModalOpen}
                                pick={pick}
                                setIsModalOpen={props.setIsModalOpen}
                                setPicks={props.setPicks}
                            />
                        </>
                    );
                }

                return (
                    <Matchup
                        key={`${currentGame.gameID}-matchup-component`}
                        allGames={props.allGames}
                        allPicks={props.allPicks}
                        allTeams={props.allTeams}
                        authenticatedUser={props.authenticatedUser}
                        awayTeam={awayTeam}
                        game={currentGame}
                        homeTeam={homeTeam}
                        isModalOpen={props.isModalOpen}
                        pick={pick}
                        setIsModalOpen={props.setIsModalOpen}
                        setPicks={props.setPicks}
                    />
                );

            })}
        </div>
    );
}


export default MatchupsContainer;