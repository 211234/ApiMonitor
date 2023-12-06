import { Sensor } from "../interfaces/sensor";
import SensorModel from "../models/sensor";

const saveSensorData = async ({ temperatureC_dht, temperatureF_dht,humidity_dht, temperaturaC_exterior, temperaturaF_exterior}: Sensor) => {
    const createSensorData =  await SensorModel.create({
        temperatureC_dht, 
        temperatureF_dht,
        humidity_dht, 
        temperaturaC_exterior, 
        temperaturaF_exterior
    });
    return createSensorData;
}

const getAllSensorData = async () => {
    const responseSensor = await SensorModel.find({});
    return responseSensor;
}

export { saveSensorData, getAllSensorData };
