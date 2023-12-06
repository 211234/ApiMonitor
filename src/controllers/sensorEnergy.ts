import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';
import * as SensorEnergyService from '../services/sensorEnergy';
import SensorEnergyModel from '../models/sensorEnergy';
import PromedioModel from '../models/Promedio';
import moment from 'moment-timezone'
import { SensorEnergyFilter } from "../interfaces/sensorEnergy"

const sensorEne = async ({ body }: Request, res: Response) => {
    try {
        const SensorData = await SensorEnergyService.saveSensorEnergyData(body);
        res.send(SensorData);
    } catch (e) {
        handleHttp(res, "ERROR_POST_DATA_SENSOR", e);
    }
};

const getAllSensorEnergyData = async (req: Request, res: Response) => {
    try {
        const { intervaloMinutos } = req.params;
        const minutos = intervaloMinutos ? parseInt(intervaloMinutos, 10) : 0;

        let filter: SensorEnergyFilter = {};

        if (minutos > 0) {
            const fechaInicio = moment().subtract(minutos, 'minutes').utcOffset(-6, true);

            console.log('Fecha de inicio:', fechaInicio.format('YYYY-MM-DD HH:mm:ss'));

            // Modificación en el filtro para incluir $lt
            filter = { Fecha: { $gte: fechaInicio.toDate(), $lt: new Date() } };
        }

        const result = await SensorEnergyModel.find(filter);
        console.log('Número de datos recuperados:', result.length);

        // Imprimir las fechas de los datos recuperados
        result.forEach(item => {
            console.log('Fecha del dato:', item.Fecha);
        });

        if (result.length > 0) {
            res.send(result);
        } else {
            res.status(404).send('No se encontraron datos.');
        }
    } catch (error) {
        console.error('Error en getAllSensorEnergyData:', error);
        handleHttp(res, 'ERROR_GET_SENSOR', error);
    }
};


const deleteAllSensorData = async (req: Request, res: Response) => {
    try {
        // Elimina todos los documentos en la colección sensoresEnergy
        await SensorEnergyModel.deleteMany({});
        res.send('Todos los datos de sensoresEnergy han sido eliminados.');
    } catch (e) {
        handleHttp(res, 'ERROR_DELETE_SENSOR_DATA', e);
    }
};

const calculateSumAndAverageController = async (req: Request, res: Response) => {
    try {
        const { intervaloMinutos } = req.params;
        const minutos = intervaloMinutos ? parseInt(intervaloMinutos, 10) : 5;

        const dataList = await SensorEnergyService.getAllSensorEnergyData(minutos);
        const averageData = SensorEnergyService.calculateSumAndAverage(dataList);

        res.send(averageData);
    } catch (e) {
        handleHttp(res, 'ERROR_CALCULATE_SUM_AVERAGE', e);
    }
};

const calculateAndSavePromedioController = async (req: Request, res: Response) => {
    try {
        let { intervaloMinutos } = req.query;

        // Si intervaloMinutos no se encuentra en los parámetros de consulta, intenta leerlo desde el cuerpo (para POST)
        if (!intervaloMinutos) {
            ({ intervaloMinutos } = req.body);
        }

        // Si aún no se encuentra, utiliza un valor predeterminado de 5 minutos
        const minutos = intervaloMinutos ? parseInt(intervaloMinutos as string, 10) : 5;

        // Calcular y guardar el nuevo promedio
        const promedioData = await SensorEnergyService.calculateAndSavePromedio(minutos);

        res.send({ promedioData });
    } catch (e) {
        handleHttp(res, 'ERROR_CALCULATE_AND_SAVE_PROMEDIO', e);
    }
};

const getAllPromedios = async (req: Request, res: Response) => {
    try {
        const allPromedios = await PromedioModel.find({});
        res.send(allPromedios);
    } catch (e) {
        handleHttp(res, 'ERROR_GET_PROMEDIOS', e);
    }
};

export {
    sensorEne,
    getAllSensorEnergyData,
    deleteAllSensorData,
    calculateSumAndAverageController,
    calculateAndSavePromedioController,
    getAllPromedios
};