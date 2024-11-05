# Usa una imagen de Node como base
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración
COPY package.json pnpm-lock.yaml ./

# Instala las dependencias usando pnpm
RUN npm install -g pnpm && pnpm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Compila el código TypeScript a la carpeta build
#RUN npm run build  # Asegúrate de que este script esté definido en tu package.json

# Asegúrate de que la carpeta dist esté en el directorio de trabajo
#RUN cp -r dist build/  # Copia la carpeta dist a build

# Define variables de entorno directamente
ENV PORT=4000
ENV MONGO_URI=mongodb+srv://AgustinM12:24879156@combodb.uusbhhs.mongodb.net/db
ENV ALLOWED_IP=172.18.0.1
ENV IP_TOKEN=a631f41522aa77
ENV JWT_SECRET=17gisusbgklsdguiwn

# Expone el puerto del servidor Express
EXPOSE 4000

CMD ["npm", "run", "start"]  # Asegúrate de que start esté definido en package.json
