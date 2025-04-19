import { useEffect, useState } from "react";

const hostURL: string = "http://127.0.0.1:5000/picks/gbtest3";

interface Pick {
    gameID: string;
    teamPicked: string;
    pickWeight: string;
    username: string
}

type PicksArray = Array<Pick>;

const PickRow = (props: Pick) => {
    return (
        <p>{props.gameID} | {props.teamPicked} | {props.pickWeight}</p>
    )
}


const PicksContainer = () => {
    const [allUserPicks, setAllUserPicks] = useState();
    const [week, setWeek] = useState(1);

    useEffect(() => {
        const fetchUserPicks = async () => {
            try {
                const response = await fetch(hostURL);
                if (!response.ok) {
                    setAllUserPicks();
                    console.log(`Request error! ${response.status}`);
                } else {
                    const data = await response.json();
                    setAllUserPicks(data);
                    console.log(data);
                }
            } catch (err) {
                console.log(`Request failed! ${err}`)
            }
        }

        fetchUserPicks();
    }, []);

    return (
        allUserPicks.map(pick => {
            <PickRow
                gameID={pick.gameID}
                teamPicked={pick.teamPicked}
                pickWeight={pick.pickWeight}
                username={pick.username}
            />
        })
    )
}

export default PicksContainer;