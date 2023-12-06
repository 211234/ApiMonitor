import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async ({ email, password, name, phone }: User) => {
  const checkIs = await UserModel.findOne({ email });
  if (checkIs) return "ALREADY_USER";
  const passHash = await encrypt(password); //TODO 12345678
  const registerNewUser = await UserModel.create({
    email,
    password: passHash,
    name,
    phone
  });
  //TODO 123456
  return registerNewUser;
};

const loginUser = async ({ email, password }: Auth) => {
  const checkIs = await UserModel.findOne({ email });
  if (!checkIs) return "NOT_FOUND_USER";

  const passwordHash = checkIs.password; //TODO el encriptado!
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) return "PASSWORD_INCORRECT";

  const token = generateToken(checkIs.email);
  const data = {
    token,
    user: checkIs,
  };
  return data;
};

const updatePerfil = async (id: string, data: User) => {
  const responseUser = await UserModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return responseUser;
};


export { registerNewUser, loginUser, updatePerfil };