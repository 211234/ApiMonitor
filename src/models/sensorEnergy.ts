import { Schema, model } from 'mongoose';
import moment from 'moment-timezone';
import { SensorEnergyDocument } from '../interfaces/sensorEnergy';

const SensorEnergySchema = new Schema<SensorEnergyDocument>(
    {
        Vrms: {
            type: Number,
            required: true,
        },
        Irms: {
            type: Number,
            required: true,
        },
        Power: {
            type: Number,
            required: true,
        },
        kWh: {
            type: Number,
            required: true,
        },
        Fecha: {
            type: Date,
            default: () => moment().tz('America/Mexico_City').toDate(),
        },
    },
    {
        versionKey: false,
    }
);

const SensorEnergyModel = model<SensorEnergyDocument>('sensoresEnergy', SensorEnergySchema);
export default SensorEnergyModel;
