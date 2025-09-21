import { SubmitButtonProps } from "./types";


const SubmitButton = (props: SubmitButtonProps) => {
    const componentID: string = `${props.parentComponentID}-button`;

    return (
        <button
            className="bg-[#17C120] h-full m-auto rounded-xl text-center text-white w-full"
            id={componentID}
            onClick={() => props.submitMethod}
        >
            {props.buttonInnerText}
        </button>
    );
}


export default SubmitButton;