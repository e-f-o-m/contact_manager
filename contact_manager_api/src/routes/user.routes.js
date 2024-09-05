import { Router } from 'express';
import usersController from '../controllers/user.controller.js';
const router = Router();

router.get ('/user/all', usersController.getAll);
router.post('/user/validate', usersController.validate);
router.get ('/user/id', usersController.getById);
router.post('/user/create', usersController.create);
router.put ('/user/update', usersController.update);

export default router;