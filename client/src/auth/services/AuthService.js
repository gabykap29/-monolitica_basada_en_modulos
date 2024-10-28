import { env } from "../../common/config/config";

export const fetchAuth = async(route, method, payload) => {
    const URL = `${env.SERVER_PATH}/${route}`;

    const token = localStorage.getItem("token");
    const authHeader = token ? `Bearer ${token}` : '';

    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: authHeader
        },
    };

    if (method === "GET") {
        const response = await fetch(URL, options);
        const data = await response.json();
        return data;
    } else {
        options.body = JSON.stringify(payload);
        const response = await fetch(URL, options);
        const data = await response.json();
        return data;
    }
}
