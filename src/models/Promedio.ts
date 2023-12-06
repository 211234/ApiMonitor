import { Schema, model } from 'mongoose';
import moment from 'moment-timezone';
import { Promedio } from '../interfaces/Promedio';

const PromedioSchema = new Schema<Promedio>(
    {
        VrmsPro: {
            type: Number,
            required: true,
        },
        IrmsPro: {
            type: Number,
            required: true,
        },
        PowerPro: {
            type: Number,
            required: true,
        },
        kWhPro: {
            type: Number,
            required: true,
        },
        gastoEnConsumoPro: {
            type: Number,
            required: true,
        },
        Fecha: {
            type: Date,
            default: () => moment().tz('America/Mexico_City').toDate(),
        },
    },
    {
        timestamps: false,
        versionKey: false,
    }
);

const PromedioModel = model('Promedio', PromedioSchema);
export default PromedioModel;
