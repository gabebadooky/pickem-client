type Props = {
    setIsLeaderboardComponentOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Leaderboard = (props: Props) => {
    return (
        <div className="mt-[25%] mx-auto">
            <h1 className="text-3xl">Under Construction!!</h1>
            <button
                className=""
                id="back-home-button"
                onClick={() => props.setIsLeaderboardComponentOpen(false)}
            >
                Back
            </button>
        </div>
    );
}

export default Leaderboard;