import { Router } from 'express';
import { checkRolAdmin } from '../../Auth/midlewares/checkRol';
const router = Router();

router.get('/', checkRolAdmin, (_req, res) => {
  res.send('Servidor On');
});

export default router;
