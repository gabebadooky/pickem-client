import { useEffect, useState } from "react";

const hostURL: string = "http://127.0.0.1:5000/picks/gbtest3";

const FetchUserPicks = async () => {
    const response = await fetch(hostURL);
    
    if (!response.ok) {
        console.log(`Request error! ${response.status}`);
    } else {
        console.log(response.json())
    }
    
};

const PicksContainer = () => {
    useEffect(() => { FetchUserPicks() })
    return (
        <div>Hello</div>
    )
}

export default PicksContainer;