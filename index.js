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
// esquemas y modelos
const CharacterSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  img: String,
  species: String
});
const Character = mongoose.model('Character', CharacterSchema);
// rutas de la API
// todos los personajes
app.get('/api/characters', (req, res) => {
  Character.find()
    .then(characters => res.status(200).json(characters));
});
// un personaje por ID
app.get('/api/characters/:id', (req, res) => {
  Character.findOne({ id: req.params.id })
    .then(character => res.status(200).json(character));
});
// crear un personaje 
app.post('/api/characters', (req, res) => {
  console.log('El body vale: ', req.body);
  const { id, name, img, species } = req.body;
  const newCharacter = new Character({ id, name, img, species });
  newCharacter.save()
    .then(character => res.status(201).json(character));
});
// borrar un personaje 
app.delete('/api/characters/:id', (req, res) => {
  Character.deleteOne({ id: req.params.id })
    .then(() => res.status(200).json({ msg: 'Character deleted!' }));
});
// modificar un personaje
app.put('/api/characters/:id', (req, res) => {
  res.send('le falta...')
}); 
// error 404
app.use((req, res) => {
  res.status(404).json({ msg: 'No encontrado' });
});
// listen
app.listen(PORT, () => {
  console.log('Server andando');
});