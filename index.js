// imports
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
// config vars
const PORT = 3000;
const DB   = 'mongodb://127.0.0.1/rickmorty';
// objeto app
const app = express();
// middleware de aplicacion
app.use(morgan('dev'));  // middleware de logs
app.use(express.json()); // parsea los bodys en JSON
// conectar a la DB
mongoose.connect(DB)
  .then(() => console.log('DB conectada'));
// rutas de personajes
import characterRouter from './routes/character.js';
app.use('/api/characters', characterRouter);
// error 404
app.use((req, res) => {
  res.status(404).json({ msg: 'No encontrado' }); // responde 404 Not found
});
// listen
app.listen(PORT, () => {
  console.log('Server andando');
});