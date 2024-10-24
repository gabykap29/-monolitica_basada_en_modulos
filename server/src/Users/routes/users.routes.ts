import UserCtrl from "../controllers/user.controllers";
import { Router } from 'express';

const router = Router();
const userCtrl = new UserCtrl();

router.get('/users', userCtrl.getUsers.bind(userCtrl));
router.get('/user/:id', userCtrl.getUser.bind(userCtrl));
router.post('/users', userCtrl.userCreate.bind(userCtrl));
router.put('/users/:id', userCtrl.userUpdate.bind(userCtrl));
router.delete('/users/:id', userCtrl.deleteUser.bind(userCtrl));

export default router;
