# Usa la imagen de Node como base
FROM node:20 AS builder

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración primero (para aprovechar la caché en el futuro)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Luego, copia el resto de los archivos de la aplicación
COPY . .

# Configura la variable de entorno de la API del servidor
ENV VITE_API_SERVER=http://localhost:4000/api

# Construye la aplicación
RUN npm run build

# Define el comando para construir
CMD ["npm", "run", "build"]
