import mongoose from 'mongoose'; 

const CharacterSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  img: String,
  species: String
});
const Character = mongoose.model('Character', CharacterSchema);

export default Character;