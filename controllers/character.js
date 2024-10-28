import Character from '../models/Character.js';

const getAllCharacters = (req, res) => {
  Character.find()
    .then(characters => res.status(200).json(characters)); // responde 200 OK
};

const getCharacterById = (req, res) => {
  Character.findOne({ id: req.params.id })
    .then(character => res.status(200).json(character));
};

const createCharacter = (req, res) => {
  console.log('El body vale: ', req.body);
  const { id, name, img, species } = req.body;
  const newCharacter = new Character({ id, name, img, species });
  newCharacter.save()
    .then(character => res.status(201).json(character)); // responde 201 Created
};

const deleteCharacter = (req, res) => {
  Character.deleteOne({ id: req.params.id })
    .then(() => res.status(200).json({ msg: 'Character deleted!' }));
};

const updateCharacter = (req, res) => {
  Character.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    .then(character => res.status(200).json(character));
};

const controller = { 
  getAllCharacters, 
  getCharacterById, 
  createCharacter,
  deleteCharacter,
  updateCharacter 
}

export default controller;