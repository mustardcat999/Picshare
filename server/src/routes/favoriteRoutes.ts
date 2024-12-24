import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController';

const router = Router();

router.get('/', getFavorites);
router.post('/:pictureId', addFavorite);
router.delete('/:pictureId', removeFavorite);

export default router;