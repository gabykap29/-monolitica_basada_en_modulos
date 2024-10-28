import { Router } from 'express';
import ReportsController from '../controller/reports.controller';

const router = Router();

router.post('/reports', ReportsController.createReport);

export default router;
