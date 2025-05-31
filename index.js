// index.js para chatbot Quality en Render
const express = require('express');
const bodyParser = require('body-parser');
const levenshtein = require('fast-levenshtein');
const { MessagingResponse } = require('twilio').twiml;
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

function normalize(text) {
  return text.toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();
}

const DISTANCE_THRESHOLD = 3;

const frases = {
  saludo: ['hola', 'buenos dias', 'buenas tardes', 'hey', 'que tal'],
  quienes: ['quienes son', 'quien eres', 'a que se dedican'],
  servicios: ['que hacen', 'servicios', 'productos', 'que ofrecen', 'cotizacion', 'impresion', 'bordado'],
  redes: ['instagram', 'facebook', 'fb', 'face', 'redes sociales', 'redes'],
  ubicacion: ['ubicacion', 'direccion', 'donde estan', 'como llegar', 'mapa', 'calle josefa'],
  contacto: ['telefono', 'numeros', 'llamar', 'contacto', 'correo', 'email'],
  horarios: ['horario', 'horarios', 'a que hora abren', 'cuando cierran']
};

function coincideConFuzzy(grupo, mensajeNormalizado) {
  for (let fraseNorm of frases[grupo]) {
    if (mensajeNormalizado.includes(fraseNorm)) return true;
    const distancia = levenshtein.get(mensajeNormalizado, fraseNorm);
    if (distancia <= DISTANCE_THRESHOLD) return true;
  }
  return false;
}

app.post('/webhook', (req, res) => {
  const raw = req.body.Body || '';
  const mensaje = normalize(raw);
  const twiml = new MessagingResponse();

  let responseMessage = '';

  if (coincideConFuzzy('saludo', mensaje)) {
    responseMessage =
      '¡Hola! 👋 Bienvenido a Quality Publicidad.\n' +
      'Soy un bot automático 🤖 para brindarte *información general*.\n\n' +
      '🛒 *Para realizar un pedido*, comunícate por teléfono:\n' +
      '📞 812 261 3422\n📞 813 912 6946\n\n' +
      '📌 Puedes escribirme cosas como:\n' +
      '• ¿Qué servicios ofrecen?\n' +
      '• ¿Dónde están ubicados?\n' +
      '• ¿Tienen redes sociales?\n' +
      '• ¿Cuál es su horario?';
  } else if (coincideConFuzzy('quienes', mensaje)) {
    responseMessage = 'Somos Quality Publicidad, una empresa de soluciones publicitarias y digitales para negocios que quieren destacar. 📣';
  } else if (coincideConFuzzy('servicios', mensaje)) {
    responseMessage = '💼 Ofrecemos:\n• Diseño gráfico\n• Lonas, viniles y stickers\n• Bordado y sublimado\n• Marcos, gorras y playeras\n• Imprenta, copiado, papelería y mercería';
  } else if (coincideConFuzzy('redes', mensaje)) {
    responseMessage = '📲 Síguenos en redes:\nFacebook: https://facebook.com/quality.plazuela\nInstagram: https://instagram.com/publicistas_quality';
  } else if (coincideConFuzzy('ubicacion', mensaje)) {
    responseMessage = '📍 Estamos en:\nJosefa Ortíz de Domínguez #608 Sur, Centro, Cadereyta Jiménez, N.L.\n(Frente a la Plazuela)\n🗺️ Google Maps: https://maps.google.com/?q=Josefa+Ortiz+de+Dominguez+608+Sur,+Cadereyta+Jimenez';
  } else if (coincideConFuzzy('contacto', mensaje)) {
    responseMessage = '☎️ Nuestros teléfonos:\n📞 812 261 3422\n📞 813 912 6946';
  } else if (coincideConFuzzy('horarios', mensaje)) {
    responseMessage = '🕒 Horarios:\nLunes a Viernes: 6:30 AM – 10:00 PM\nSábado: 8:00 AM – 8:00 PM\nDomingo: 9:00 AM – 8:00 PM';
  } else {
    responseMessage =
      'En breve te atiende un agente 😊\n\n' +
      'También puedes probar con estos mensajes:\n' +
      '• ¿Quiénes son?\n' +
      '• ¿Qué servicios ofrecen?\n' +
      '• ¿Dónde están ubicados?\n' +
      '• ¿Tienen redes sociales?\n' +
      '• ¿Cuál es su horario?\n' +
      '• ¿Cómo los contacto?';
  }

  twiml.message(responseMessage);
  res.type('text/xml').send(twiml.toString());
});

app.listen(PORT, () => {
  console.log(`🤖 Bot escuchando en el puerto ${PORT}`);
});
