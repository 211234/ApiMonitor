import { Request, Response } from "express";
import dbConnect from "../config/mongo";
import { handleHttp } from "../utils/error.handle";
import { saveSensorData, getAllSensorData } from "../services/sensor";

const sensorTem = async ({ body }: Request, res: Response) => {
    try {
      const SensorData = await saveSensorData(body);
      res.send(SensorData);
    } catch (e) {
      handleHttp(res, "ERROR_POST_DATA_SENSOR", e);
    }
}; 

const getAllSensorTem = async (req: Request, res: Response) => {
  try {
    const response = await getAllSensorData();
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_SENSOR");
  }
};

export { sensorTem, getAllSensorTem };