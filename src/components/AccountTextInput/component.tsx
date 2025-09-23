import { AccountTextInputProps } from "./types";


const AccountTextInput = (props: AccountTextInputProps) => {

    return (
        <input
            className="h-full m-auto w-full"
            id={props.componentID}
            name={props.componentName}
            onInput={() => props.onInput}
            placeholder={props.placeholder}
            type="text"
        />
    );
}


export default AccountTextInput;