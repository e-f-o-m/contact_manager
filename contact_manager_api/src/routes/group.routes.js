import { Router } from 'express';
import groupController from '../controllers/group.controller.js';
const router = Router();

router.get ('/group/all', groupController.getAll);
router.post('/group/create', groupController.create);

export default router;