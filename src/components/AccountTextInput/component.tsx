import { AccountTextInputProps } from "./types";


const AccountTextInput = (props: AccountTextInputProps) => {

    return (
        <input
            className="h-full m-auto rounded-xl text-black text-center text-xl w-full"
            id={props.componentID}
            name={props.componentName}
            onChange={props.onChange}
            placeholder={props.placeholder}
            type={props.type}
        />
    );
}


export default AccountTextInput;