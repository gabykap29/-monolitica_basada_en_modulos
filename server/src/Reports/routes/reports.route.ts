import { Router } from 'express';
import ReportsController from '../controller/reports.controller';

const router = Router();

router.post('/reports', ReportsController.createReport);
router.get('/reports', ReportsController.getAllReports);
router.get('/reports/:id', ReportsController.getReportById);
router.delete('/reports/:id', ReportsController.deleteReport);

export default router;
