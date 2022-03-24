import { Router } from 'express';
import { register, login } from '../controllers/auth';
const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/signup', register);
router.get('/signin', login);

export default router;