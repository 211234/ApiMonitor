import { Request, Response } from "express";
import { registerNewUser, loginUser, updatePerfil, MySpecificRequest } from "../services/auth";
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

const perfilCtrl = async (req: MySpecificRequest, res: Response) => {
  try {
    const { id } = req.params;
    const response = await updatePerfil(id, req.body);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_UPDATE");
  }
};


export { loginCtrl, registerCtrl, perfilCtrl,  MySpecificRequest};