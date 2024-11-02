export const useApiFetch = async (route, method, payload, param) => {

    const apiRoute = import.meta.env.VITE_API_SERVER

    const url = `${apiRoute}${route}`

    const token = localStorage.getItem("token")

    const headers = {
        "Content-Type": "application/json",
    };

    if (url.includes("/auth/") || url.includes("/api/")) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    //! SIN ARCHIVOS
    if (method === "GET") {
        try {

            const response = await fetch(url + (param && `/${param}`), {
                method: method,
                headers: {
                    Authorization: `${localStorage.getItem("token")}`,
                },
            });

            const data = await response.json();

            return data

        } catch (error) {
            console.error("Error al realizar la peticion:", error);
        }
    }
    else if (method !== "GET") {
        try {

            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: JSON.stringify(payload),
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error("Error al realizar la petición", error);
        }

    }
}