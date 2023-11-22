import { Schema, Types, model, Model } from "mongoose";
import { Sensor } from "../interfaces/sensor";

const SensorSchema = new Schema<Sensor>(
  {
    temperatura_dht: {
      type: Number,
      required: true,
    },
    humedad_dht: {
      type: Number,
      required: true,
    },
    temperatura_exterior: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SensorModel = model("sensores", SensorSchema);
export default SensorModel;