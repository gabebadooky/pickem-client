type SubmitButtonProps = {
    buttonInnerText: string;
    parentComponentID: string;
    submitMethod: any;
}


const SubmitButton = (props: SubmitButtonProps) => {
    const componentID: string = `${props.parentComponentID}-button`;

    return (
        <button
            className="bg-[#17C120] h-full m-auto rounded-xl text-center w-full"
            id={componentID}
            onClick={props.submitMethod}
        >
            {props.buttonInnerText}
        </button>
    );
}


export default SubmitButton;