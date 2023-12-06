import { Document } from 'mongoose';

export interface SensorEnergy {
    Vrms: number;
    Irms: number;
    Power: number;
    kWh: number;
    Fecha?: Date;
}

export interface SensorEnergyDocument extends SensorEnergy, Document {}

export interface SensorEnergyFilter {
    Fecha?: {
        $gte: Date;
        $lt?: Date; // Hacer $lt opcional
    };
}