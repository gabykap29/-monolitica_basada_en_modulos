# backend/Dockerfile

# Usa una imagen de Node como base
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de tu servidor
COPY . .

# Copia los archivos estáticos de la aplicación React (la build)
COPY ../frontend/dist ./dist

# Instala las dependencias
RUN npm install

# Expone el puerto del servidor Express (puedes ajustar el puerto si es necesario)
EXPOSE 3000

# Comando para iniciar el servidor Express
CMD ["npm", "start"]
