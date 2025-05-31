# 🤖 Chatbot Quality

Este proyecto es un bot sencillo hecho con Node.js, Express y Ngrok que responde mensajes por WhatsApp a través de un webhook.

---

## 🚀 Requisitos

- Node.js v18 o superior
- Cuenta de https://ngrok.com/
- Cuenta de Twilio con WhatsApp Sandbox configurado (opcional)

---

## 🛠 Instalación

1. Clona el repositorio:

git clone https://github.com/TheVichoz/Bot-Quality.git
cd Bot-Quality

2. Instala las dependencias:

npm install

3. Copia el archivo `.env.example` y configúralo:

cp .env.example .env

4. Corre el bot:

node index.js

5. En otra terminal, ejecuta Ngrok:

npx ngrok authtoken TU_AUTHTOKEN
npx ngrok http 3000

6. Usa el link HTTPS generado por Ngrok como tu Webhook en Twilio.

---

## 📂 Archivos importantes

- index.js: Servidor principal y lógica del bot  
- .env.example: Variables de entorno necesarias  
- .gitignore: Ignora `.env` y `node_modules`

---

## 📦 Dependencias

- express  
- body-parser  
- dotenv  
- ngrok

---

## 👨‍💻 Autor

Victor Hernández (Cadetek) – Quality Publicidad

---

## ⬆️ Subir a GitHub

git init  
git add .  
git commit -m "Proyecto base del chatbot Quality"  
git remote add origin https://github.com/TheVichoz/Bot-Quality.git  
git push -u origin main
