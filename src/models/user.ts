import { Schema, Types, model, Model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
  {
    name: {
      required: true,
      type: String,
    },
    phone: {
      required: true,
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    intervaloMinutos: {
      type: Number,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserModel = model("users", UserSchema);
export default UserModel;