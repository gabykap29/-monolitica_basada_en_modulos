export const useApiFetch = async (route, method, payload, param) => {

    const apiRoute = "http://localhost:4000/api"
    console.log(apiRoute)

    const url = `${apiRoute}${route}`

    const token = localStorage.getItem("token")

    const headers = {
        "Content-Type": "application/json",
    };

    if (url.includes("/auth/") || url.includes("/api/")) {
        headers["Authorization"] = `${token}`;
    }

    const paramUrl = param && url + "/" + param

    console.log(paramUrl);

    if (method === "GET") {
        try {

            const response = await fetch(param ? paramUrl : url, {
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
    else if (method === "DELETE" || method === "PUT") {
        try {

            const response = await fetch(param ? paramUrl : url, {
                method: method,
                headers: headers,
            })

            const data = await response.json()

            return data

        } catch (error) {
            console.error("Error al realizar la petición", error);
        }

    } else if (method === "POST") {
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