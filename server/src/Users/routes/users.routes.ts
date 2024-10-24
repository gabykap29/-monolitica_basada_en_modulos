import UserCtrl from "../controllers/user.controllers";
import { Router } from 'express';

const router = Router();
const userCtrl = new UserCtrl();

router.get('/users', userCtrl.getUsers);
router.get('/user/:id', userCtrl.getUser);
router.post('/users', userCtrl.userCreate);
router.put('/users/:id', userCtrl.userUpdate);
router.delete('/users/:id', userCtrl.deleteUser);

export default router;
