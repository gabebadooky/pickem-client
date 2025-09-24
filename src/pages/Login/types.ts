export type LoginProps = {
    username: string | undefined;
    password: string | undefined;
}


export type LoginAttemptResponses = "Success" | "Incorrect" | "Error";