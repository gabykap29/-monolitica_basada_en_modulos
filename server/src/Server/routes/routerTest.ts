import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const clientIp = req.ip;
  res.send("Servidor On, Public IP: " + clientIp);
});


export default router;