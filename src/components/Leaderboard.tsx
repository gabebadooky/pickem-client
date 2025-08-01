type Props = {
    setIsLeaderboardComponentOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Leaderboard = (props: Props) => {
    return (
        <div className="mt-[25%] mx-auto">
            <h1 className="text-3xl">Under Construction!!</h1>
            <button
                className="border-1 border-white flex h-full items-center justify-center mt-15 mx-auto px-5 py-2 rounded-lg"
                id="back-home-button"
                onClick={() => props.setIsLeaderboardComponentOpen(false)}
            >
                Back
            </button>
        </div>
    );
}

export default Leaderboard;