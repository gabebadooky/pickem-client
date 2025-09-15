const LoadingSpinner = () => {
    return(
        <div className="fixed flex h-[100vh] items-center justify-center m-auto w-[100vw] z-50">
            <img src="/loadingBlocks.gif" alt="Loading..." />
        </div>
    )
}

export default LoadingSpinner;