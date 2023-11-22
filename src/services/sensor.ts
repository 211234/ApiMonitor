import { Sensor } from "../interfaces/sensor";
import SensorModel from "../models/sensor";

//import socketHandler from '../../services/registerDataSensorsServices/socketHandler';

const saveSensorData = async ({ temperatura_dht, humedad_dht, temperatura_exterior }: Sensor) => {
    const createSensorData =  await SensorModel.create({
        temperatura_dht,
        humedad_dht,
        temperatura_exterior
    });
    return createSensorData;
}

const getAllSensorData = async () => {
    const responseSensor = await SensorModel.find({});
    return responseSensor;
}

export { saveSensorData, getAllSensorData };

