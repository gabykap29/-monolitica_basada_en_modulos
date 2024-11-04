# server/Dockerfile

# Usa una imagen de Node como base
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de tu servidor
COPY . .

# Instala las dependencias
RUN npm install

# Define variables de entorno directamente
ENV PORT=4000
ENV MONGO_URI=mongodb+srv://testggacc:pKYKvDFywDL2mRlr@cluster.vbqhi.mongodb.net/
ENV ALLOWED_IP=127.0.0.1
ENV IP_TOKEN=a631f41522aa77
ENV JWT_SECRET=17gisusbgklsdguiwn

# Expone el puerto del servidor Express (puedes ajustar el puerto si es necesario)
EXPOSE 4000

# Comando para iniciar el servidor Express
CMD ["npm", "start"]
