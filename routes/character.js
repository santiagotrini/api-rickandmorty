import express from 'express';
import controller from '../controllers/character.js';

const router = express.Router();
// rutas de la API
router.route('/')
  .get(controller.getAllCharacters)
  .post(controller.createCharacter);
router.route('/:id', )
  .get(controller.getCharacterById)
  .put(controller.updateCharacter)
  .delete(controller.deleteCharacter);

export default router;