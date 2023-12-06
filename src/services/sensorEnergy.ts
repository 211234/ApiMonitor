import { SensorEnergy } from '../interfaces/sensorEnergy';
import PromedioModel from '../models/Promedio';
import SensorEnergyModel from '../models/sensorEnergy';
import { Promedio } from '../interfaces/Promedio';
import moment from 'moment';

const saveSensorEnergyData = async (data: SensorEnergy) => {
    // Obtén la fecha actual ajustada según la zona horaria mexicana
    const Fecha = moment().utcOffset(-6, true).toDate();

    // Agrega la fecha ajustada a los datos
    const dataWithFecha = { ...data, Fecha };

    // Crea y guarda los datos en la base de datos
    const createSensorEnergyData = await SensorEnergyModel.create(dataWithFecha);
    
    return createSensorEnergyData;
};


type DateRange = {
    $gte: Date;
    $lt?: Date; 
};

type SensorEnergyFilter = {
    Fecha?: DateRange;
};


const getAllSensorEnergyData = async (intervaloMinutos?: number) => {
    let filter: SensorEnergyFilter = {};

    if (intervaloMinutos) {
        const fechaInicio = new Date();
        fechaInicio.setMinutes(fechaInicio.getMinutes() - intervaloMinutos);

        console.log('Fecha de inicio:', fechaInicio);

        // Modificación en el filtro para incluir $lt
        filter = { Fecha: { $gte: fechaInicio, $lt: new Date() } };
    }

    const result = await SensorEnergyModel.find(filter);
    console.log('Datos recuperados:', result);

    return result;
};

const deleteAllSensorData = async () => {
    // Elimina todos los documentos en la colección sensoresEnergy
    const result = await SensorEnergyModel.deleteMany({});
    return result;
};

const calculateSumAndAverage = (dataList: SensorEnergy[]) => {
    const sumData: Partial<SensorEnergy> = {};
    const keys: (keyof SensorEnergy)[] = ['Vrms', 'Irms', 'Power', 'kWh'];

    for (const data of dataList) {
        for (const key of keys) {
            if (key !== 'Fecha') {
                const value = typeof data[key] === 'number' ? data[key] : 0;
                sumData[key] = (sumData[key] ?? 0) + value;
            }
        }
    }

    console.log('Suma de datos:', sumData);

    const averageData: Partial<SensorEnergy> = {};
    const totalCount = dataList.length || 1;

    for (const key of keys) {
        if (key !== 'Fecha') {
            averageData[key] = totalCount === 0 ? 0 : (sumData[key] ?? 0) / totalCount;
        }
    }

    console.log('Datos promedio:', averageData);

    return averageData as SensorEnergy;
};

const calculateCost = (kWh: number) => {
    const precioKWh = 0.858; // Precio en pesos mexicanos
    return kWh * precioKWh;
};

const calculateAndSavePromedio = async (intervaloMinutos: number) => {
    const dataList = await getAllSensorEnergyData(intervaloMinutos);
    const averageData = calculateSumAndAverage(dataList);

    // Calcular gastoEnConsumoPro utilizando la función calculateCost
    const gastoEnConsumoPro = calculateCost(averageData.kWh || 0);

    // Obtén la fecha actual ajustada según la zona horaria mexicana
    const fechaPromedio = moment().utcOffset(-6, true).toDate();

    // Guardar los promedios en la nueva colección
    const promedioData: Partial<Promedio> = {
        VrmsPro: averageData.Vrms || 0,
        IrmsPro: averageData.Irms || 0,
        PowerPro: averageData.Power || 0,
        kWhPro: averageData.kWh || 0,
        gastoEnConsumoPro,
        Fecha: fechaPromedio,
    };

    const createPromedioData = await PromedioModel.create(promedioData);
    console.log('Datos de promedio guardados:', createPromedioData);
    return createPromedioData;
};


export {
    calculateCost,
    saveSensorEnergyData,
    getAllSensorEnergyData,
    deleteAllSensorData,
    calculateAndSavePromedio,
    calculateSumAndAverage
};