import { Request, Response } from "express";
import { registerNewUser, loginUser, updatePerfil } from "../services/auth";
import { handleHttp } from "../utils/error.handle";

const registerCtrl = async ({ body }: Request, res: Response) => {
  const responseUser = await registerNewUser(body);
  res.send(responseUser);
};

const loginCtrl = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
  const responseUser = await loginUser({ email, password });

  if (responseUser === "PASSWORD_INCORRECT") {
    res.status(403);
    res.send(responseUser);
  } else {
    res.send(responseUser);
  }
};

const perfilCtrl = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params
    const response = await updatePerfil(id, body);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_UPDATE")
  }
};

export { loginCtrl, registerCtrl, perfilCtrl };