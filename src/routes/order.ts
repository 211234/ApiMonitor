import { Router } from "express";
import { getAllSensorTem, getAllSensorEne } from "../controllers/order";
import { checkJwt } from "../middleware/session";


const router = Router();

router.get("/", checkJwt, getAllSensorTem);
router.get("/", checkJwt, getAllSensorEne);

export { router };