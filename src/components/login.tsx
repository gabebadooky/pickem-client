const LoginInputs = () => {
    return (
        <div>

            <h1>Pickem</h1>
            
            <input 
                className="accountInputField"
                id="usernameInput"
                placeholder="Username or Email Address"
                type="text"
            />
            
            <input
                className="accountInputField"
                id="passwordInput"
                placeholder="Password"
                type="password"
            />
            
            <button
                className="submitButton"
                id="loginButton"
                type="submit"
            />
            
            <button 
                className="hollowButton"
                id="createAccountButton"
                type="button"
            />
            
        </div>
    )
}

export default LoginInputs;