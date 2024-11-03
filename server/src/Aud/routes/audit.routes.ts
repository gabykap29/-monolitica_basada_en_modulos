import { Router } from 'express';
import AuditCtrl from '../controllers/audit.controllers';

const router = Router();
const auditCtrl = new AuditCtrl();

router.get('/logs/:logType?', auditCtrl.getLogs.bind(auditCtrl)); 

export default router;
