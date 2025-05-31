# 🤖 Chatbot Quality

Este proyecto es un bot sencillo hecho con Node.js, Express y Ngrok que responde mensajes por WhatsApp a través de un webhook.

---

## 🚀 Requisitos

- Node.js v18 o superior
- Una cuenta de [Ngrok](https://ngrok.com/)
- Cuenta de Twilio con WhatsApp Sandbox configurado (opcional)

---

## 🛠 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu_usuario/chatbot-quality.git
cd chatbot-quality

Instala las dependencias:
npm install

Copia el archivo .env.example y llénalo:
cp .env.example .env

Corre el bot:
node index.js

En una nueva terminal, ejecuta Ngrok para exponer el puerto:
npx ngrok authtoken TU_AUTHTOKEN
npx ngrok http 3000

