import { env } from "../../common/config/config";

export const fetchAuth = async (route, method, payload) => {
    const URL = `${env.SERVER_PATH}${route}`;

    console.log("base: ", payload)

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

