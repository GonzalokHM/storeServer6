const express = require('express');
require('dotenv').config();
const { connectDB } = require('./src/config/db');
const { setError } = require('./src/config/error');

const server = express();

connectDB();

server.use('/api/v1', (req, res, next) => {
  return res.status(200).json('esto funciona perfecto 🙂');
});

server.use('*', (req, res, next) => {
    return next(setError(404,'Not found'));
//   res.status(404).json('no tengo nada que ofrecerte 😞');
});

//controlador errores generales de servidor
server.use((error, req, res, next) => {
  return res
    .status(error.status||500)
    .json(error.message || 'Internal Server Error');
});

const PORT = 4001;
server.listen(PORT, () => {
  console.log(`escuchando en: http//:localhost:${PORT}`);
});
