import { TeamTile } from "../TeamTile";
import { MatchupProps } from "./types";


const Matchup = (props: MatchupProps) => {
    const componentID: string = `${props.pick.userID}-${props.pick.gameID}-matchup`;

    
    return (
        <div
            className="h-full flex justify-center m-auto w-full"
            id={`${componentID}-div`}
            key={`${componentID}-div`}
        >

            <div
                className="h-full m-auto p-[5%] w-[50%]"
                id={`${componentID}-away-team-div`}
                key={`${componentID}-away-team-div`}
            >
                <TeamTile
                    allGames={props.allGames}
                    allPicks={props.allPicks}
                    allTeams={props.allTeams}
                    authenticatedUser={props.authenticatedUser}
                    awayTeam={props.awayTeam}
                    game={props.game}
                    homeTeam={props.homeTeam}
                    isModalOpen={props.isModalOpen}
                    pick={props.pick}
                    tileTeam={props.awayTeam}
                    setIsModalOpen={props.setIsModalOpen}
                    setPicks={props.setPicks}
                />
            </div>

            <div
                className="h-full m-auto p-[5%] w-[50%]"
                id={`${componentID}-home-team-div`}
                key={`${componentID}-home-team-div`}
            >
                <TeamTile
                    allGames={props.allGames}
                    allPicks={props.allPicks}
                    allTeams={props.allTeams}
                    authenticatedUser={props.authenticatedUser}
                    awayTeam={props.awayTeam}
                    game={props.game}
                    homeTeam={props.homeTeam}
                    isModalOpen={props.isModalOpen}
                    pick={props.pick}
                    tileTeam={props.homeTeam}
                    setIsModalOpen={props.setIsModalOpen}
                    setPicks={props.setPicks}
                />
            </div>

        </div>
    );
}


export default Matchup;