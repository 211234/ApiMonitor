import { Request, Response, Router } from "express";

import { sensorTem, getAllSensorTem } from "../controllers/sensor";
import { logMiddleware } from "../middleware/log";

const router = Router();

router.post("/sensor", logMiddleware,sensorTem);
router.get("/sensores", logMiddleware,getAllSensorTem)


export { router };