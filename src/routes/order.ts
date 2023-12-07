import { Router } from "express";
import { getAllSensorTem, getAllSensorEnergyData } from "../controllers/order";
import { checkJwt } from "../middleware/session";


const router = Router();

router.get("/", checkJwt, getAllSensorTem);
router.get("/", checkJwt, getAllSensorEnergyData);

export { router };

