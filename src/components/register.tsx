const RegisterInputs = () => {
    return (
        <div>

            <input
                className="accountInputField"
                id="usernameInput"
                placeholder="Username"
                type="text"
            />
            
            <input
                className="accountInputField"
                id="passwordInput"
                placeholder="Password"
                type="password"
            />
            
            <input
                className="accountInputField"
                id="confirmPasswordInput"
                placeholder="Confirm Password"
                type="text" 
            />
            
            <button 
                className="submitButton"
                id="registerButton"
                type="submit"
            />
            
        </div>
    )
}

export default RegisterInputs;