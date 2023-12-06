import { Schema, Types, model, Model } from "mongoose";
import { Sensor } from "../interfaces/sensor";

const SensorSchema = new Schema<Sensor>(
  {
    temperatureC_dht: {
      type: Number,
      required: true,
    },
    temperatureF_dht: {
      type: Number,
      required: true,
    },
    humidity_dht: {
      type: Number,
      required: true,
    },
    temperaturaC_exterior: {
      type: Number,
      required: true,
    },
    temperaturaF_exterior: {
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