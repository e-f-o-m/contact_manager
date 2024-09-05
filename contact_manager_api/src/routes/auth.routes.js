import { Router } from 'express';
const router = Router();
import { signup, login, validate } from '../controllers/auth.controller';

router.post('/auth/signup', signup);
router.post('/auth/login', login);
router.post('/auth/validate', validate);

export default router;