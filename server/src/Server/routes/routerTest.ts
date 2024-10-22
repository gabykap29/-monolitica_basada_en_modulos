import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Servidor On");
});


export default router;