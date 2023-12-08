import { Request, Response, Router } from "express";
import { registerCtrl, loginCtrl, perfilCtrl } from "../controllers/auth";

const router = Router();
router.post("/register", registerCtrl);
router.post("/login", loginCtrl);
router.put("/configuracion/:id", perfilCtrl);
router.put("/configuracion/intervalo/:id", perfilCtrl);

export { router };