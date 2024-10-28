import AuthCtrl from '../controllers/auth.controllers';
import { Router } from 'express';

const router = Router();
const authCtrl = new AuthCtrl();

//login
router.post('/login', authCtrl.login);

export default router;
