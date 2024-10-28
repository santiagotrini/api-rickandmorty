// imports
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
// config vars
const PORT = process.env.PORT || 3000;
const DB   = process.env.DB   || 'mongodb://127.0.0.1/rickmorty';
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
// GET /api/characters
app.get('/api/characters', (req, res) => {
  Character.find()
    .then(characters => res.status(200).json(characters)); // responde 200 OK
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
    .then(character => res.status(201).json(character)); // responde 201 Created
});
// borrar un personaje 
app.delete('/api/characters/:id', (req, res) => {
  Character.deleteOne({ id: req.params.id })
    .then(() => res.status(200).json({ msg: 'Character deleted!' }));
});
// modificar un personaje
app.put('/api/characters/:id', (req, res) => {
  Character.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    .then(character => res.status(200).json(character));
}); 
// error 404
app.use((req, res) => {
  res.status(404).json({ msg: 'No encontrado' }); // responde 404 Not found
});
// listen
app.listen(PORT, () => {
  console.log('Server andando');
});