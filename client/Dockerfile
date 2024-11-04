# frontend/Dockerfile

# Usa la imagen de Node como base
FROM node:18 AS builder

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de tu aplicación
COPY . .

# Instala las dependencias y construye la aplicación
RUN npm install && npm run build

# Directorio de destino de los archivos generados por la build
# Esto es opcional, pero se recomienda
CMD ["npm", "run", "build"]
