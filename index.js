const express = require('express');
require('dotenv').config();
const { connectDB } = require('./src/config/db');
const { setError } = require('./src/config/error');
const indexRouter = require('./src/api/routes/indexRouter');
const cloudinary = require('cloudinary').v2
const cors = require("cors");

const server = express();

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret:process.env.API_SECRET
})

server.use(cors());
server.use(express.json())

server.use('/api/v1', indexRouter);

server.use('*', (req, res, next) => {
  return next(setError(404, 'Not found'));
  //   res.status(404).json('no tengo nada que ofrecerte 😞');
});

//controlador errores generales de servidor
server.use((error, req, res, next) => {
  return res
    .status(error.status || 500)
    .json(error.message || 'Internal Server Error');
});

const PORT = 4001;
server.listen(PORT, () => {
  console.log(`escuchando en: http//:localhost:${PORT}`);
});
