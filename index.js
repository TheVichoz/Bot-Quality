const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.post('/webhook', (req, res) => {
  const message = req.body.Body.toLowerCase();
  let responseMessage = 'En breve te atenderá un agente 😊';

  if (message.includes('hola')) {
    responseMessage = '¡Hola! 👋 Bienvenido a Quality Publicidad. ¿En qué podemos ayudarte?';
  } else if (message.includes('quiénes son') || message.includes('quienes son') || message.includes('quién eres')) {
    responseMessage = 'Somos Quality Publicidad, una empresa de soluciones publicitarias y digitales para negocios que quieren destacar. 📣';
  } else if (message.includes('qué hacen') || message.includes('que hacen') || message.includes('servicios')) {
    responseMessage = 'Ofrecemos servicios como diseño gráfico, lonas, viniles, marketing digital y desarrollo de soluciones web personalizadas.';
  } else if (message.includes('redes')) {
    responseMessage = 'Sí, encuéntranos en Facebook como "Quality Publicidad" 📱';
  } else if (message.includes('ubicación') || message.includes('dónde están') || message.includes('donde estan')) {
    responseMessage = 'Estamos ubicados en Cadereyta, Nuevo León. ¡Con gusto podemos atenderte presencialmente!';
  } else if (message.includes('contacto') || message.includes('teléfono') || message.includes('correo')) {
    responseMessage = 'Puedes escribirnos directamente por aquí o contactarnos por correo: quality.cadereyta@gmail.com';
  }

  const twiml = `<Response><Message>${responseMessage}</Message></Response>`;
  res.type('text/xml').send(twiml);
});

app.listen(PORT, () => {
  console.log(`Bot escuchando en el puerto ${PORT}`);
});
