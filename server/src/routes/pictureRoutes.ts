import express from 'express';
import upload from '../middleware/multerConfig';
import { getPictures, sharePicture } from '../controllers/pictureController';

const router = express.Router();

router.get('/', getPictures);
router.post('/', upload.single('image'), sharePicture);

export default router;