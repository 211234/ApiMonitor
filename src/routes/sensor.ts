import { Request, Response, Router } from "express";
import { sensorTem, getAllSensorTem } from "../controllers/sensor";

const router = Router();

router.post("/sensor",sensorTem);
router.get("/sensores",getAllSensorTem)


export { router };