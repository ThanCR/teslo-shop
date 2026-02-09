import { testloApi } from "../../api/teslo-api"
import type { AuthResponse } from "../interfaces/auth.response";

interface Options {
    email: string,
    password: string,
}

export const loginAction = async({email, password}:Options): Promise<AuthResponse> => {
    try {
        
        const { data } = await testloApi.post<AuthResponse>('/auth/login', {
            email,
            password,
        })
        console.log(data);

        return data || undefined;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

