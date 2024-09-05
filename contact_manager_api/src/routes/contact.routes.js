import { Router } from 'express';
import groupController from '../controllers/contact.controller.js';
const router = Router();

router.get ('/contact/getAllByUser', groupController.getAllByUser);
router.post('/contact/create', groupController.create);
router.delete('/contact/delete', groupController.deleteContact);
router.put('/contact/update', groupController.update);


export default router;