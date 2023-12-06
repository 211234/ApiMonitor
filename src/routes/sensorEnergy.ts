import { Router } from 'express';
import {
    sensorEne,
    deleteAllSensorData,
    getAllSensorEnergyData,
    calculateAndSavePromedioController,
    calculateSumAndAverageController,
    getAllPromedios
} from '../controllers/sensorEnergy';

const router = Router();

router.post('/sensorEnergia', sensorEne);
router.delete('/sensoresEnergia', deleteAllSensorData);
router.get('/sensoresEnergia/:intervaloMinutos', getAllSensorEnergyData);

// Ruta única para calcular y guardar el promedio, acepta tanto GET como POST
router.route('/calculate-and-save-promedio')
.all(calculateAndSavePromedioController);

// Rutas para calcular suma y promedio, cambia la ruta del cálculo para usar GET
router.get('/calculate-sum-average/:intervaloMinutos?', calculateSumAndAverageController);

router.get('/all-promedios', getAllPromedios);

export { router };
