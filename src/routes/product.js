import { Router } from 'express';
import { create, get, list, remove, update } from '../controllers/product';
import { userById } from '../controllers/user';
import { checkAuth, isAdmin, isAuth, requiredSignIn } from '../middlewares/checkAuth';

const router = Router();

router.get('/products', checkAuth, list);
router.post('/products/:userId', requiredSignIn, isAuth, isAdmin, checkAuth, create);
router.get('/product/:id', checkAuth, get);
router.delete('/product/:id', checkAuth, remove);
router.put('/product/:id', checkAuth, update);

router.param('userId', userById)
export default router;