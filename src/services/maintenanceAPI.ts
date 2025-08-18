
import { BASE_URL } from "./baseURL";

const pickemHeaders: Headers = new Headers();
pickemHeaders.append("Content-Type", "application/json");


export const checkIfSystemUnderMaintenance =  async (): Promise<{"isTrue": number}> => {
    const response = await fetch(`${BASE_URL}/maintenance`);
    if (!response.ok) {
        console.log(`Error occurred during checkIfSystemUnderMaintenance request! ${response.text}`);
        throw new Error(`Error occurred during checkIfSystemUnderMaintenance request! ${response.text}`);
    } else {
        return response.json();
    }
}