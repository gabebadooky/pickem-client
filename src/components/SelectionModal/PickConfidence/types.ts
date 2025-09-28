import { Game } from "../../../types/game";
import { Pick } from "../../../types/pick";
import { Team } from "../../../types/team";
import { User } from "../../../types/user";


export type PickConfidenceProps = {
    allPicks: Pick[];
    authenticatedUser: User;
    awayTeam: Team;
    game: Game;
    homeTeam: Team;
    pick: Pick;
    selectedTeam: Team;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setPicks: React.Dispatch<React.SetStateAction<Pick[]>>;
}



export type ScoreboardEvent = {
    id: string;
    uid: string
    date: string;
    name: string;
    shortName: string;
    season: {
        year: number;
        type: number;
        slug: string;
    };
    week: {
        number: number;
    };
    competitions: {
        id: string;
        uid: string;
        date: string;
        attendance: number;
        type: {
            id: string;
            abbreviation: string;
        };
        timeValid: boolean;
        dateValid: boolean;
        neutralSite: boolean;
        conferenceCompetition: boolean;
        playByPlayAvailable: boolean;
        recent: boolean;
        venue: {
            id: string;
            fullName: string;
            address: {
                city: string;
                state: string;
                country: string;
            };
            indoor: boolean;
        };
        competitors: {
            id: string;
            uid: string;
            type: string;
            order: number;
            homeAway: string;
            winner: boolean;
            team: {
                id: string;
                uid: string;
                location: string;
                name: string;
                abbreviation: string;
                displayName: string;
                shortDisplayName: string;
                color: string;
                alternateColor: string;
                isActive: boolean;
                venue: {
                    id: string;
                };
                links: object[];
                logo: string;
                conferenceId: string;
            };
            score: string;
            linescores: {
                value: number;
                displayValue: string;
                period: number;
            }[];
            statistics: object[];
            curatedRank: {
                current: number;
            };
            records: {
                name: string;
                abbreviation: string;
                type: string;
                summary: string;
            }[];
        }[];
        status: {
            clock: number,
            displayClock: string,
            period: number,
            type: {
                id: string,
                name: string,
                state: string,
                completed: boolean,
                description: string,
                detail: string,
                shortDetail: string
            }
        }
    }[];
}