import { Router } from 'express';
import tagController from '../controllers/tag.controller.js';
const router = Router();

router.get ('/tag/all', tagController.getAll);
router.post('/tag/create', tagController.create);

export default router;