import { env } from '../../common/config/config';

export const fetchStudent = async(route, method, payload) => {
    const url = `${env.SERVER_PATH}${route}`;

    const token = localStorage.getItem("token");
    const authHeader = token ? `Bearer ${token}` : '';

    if(method === "GET"){
        try {
            const response = await fetch(url, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authHeader}`,
              },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en la solicitud GET:", error);
            throw error;
        }
    } else {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${authHeader}`,
                },
                body: JSON.stringify(payload),
            });
      
            if (!response.ok) {
                // Si el servidor devuelve un error, lanza una excepción con el mensaje del servidor
                const errorData = await response.json();
                throw new Error(errorData.message || "Error en la solicitud POST");
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error en la solicitud POST:", error);
            throw error;
        }
    }
          
}
