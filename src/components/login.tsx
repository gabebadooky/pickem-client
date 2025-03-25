import { useState } from "react";


const LoginTextInput = ({ placeholderText }: { placeholderText : string }) => {
    return (
        <input
            placeholder={placeholderText}
            type="text"
        />
    )
}

const SubmitButton = () => {
    return (
        <button
            //onClick={}
        >
            Continue
        </button>
    )
}

const CreateAccountButton = () => {
    return (
        <button
            //onClick={}
            type="submit"
        >
            Create Account
        </button>
    )
}


const Login = () => {
    return (
        <div>
            <LoginTextInput placeholderText="Username or Email Address" />
            <LoginTextInput placeholderText="Password" />
        </div>
    )
}

export default Login;