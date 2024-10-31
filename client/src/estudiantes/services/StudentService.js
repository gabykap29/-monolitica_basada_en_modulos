import { env } from '../../common/config/config';

export const fetchStudent = async(route, method, payload = null) => {
    const url = `${env.SERVER_PATH}${route}`;
    const token = localStorage.getItem("token");
    const authHeader = token ? `Bearer ${token}` : '';

    try {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
            }
        };
        
        if (payload && method !== "DELETE") {
            options.body = JSON.stringify(payload);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en la solicitud");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw error;
    }
};

