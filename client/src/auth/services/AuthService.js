import { env } from "../../common/config/config";

export const fetchAuth = async (route, method, payload) => {
    
    const apiRoute = import.meta.env.VITE_API_SERVER
    
    const URL = `${apiRoute}/${route}`;

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    };
    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
};

