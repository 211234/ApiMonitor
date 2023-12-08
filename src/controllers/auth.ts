import { Request, Response } from 'express';
import { registerNewUser, loginUser, updatePerfil, MySpecificRequest } from '../services/auth';
import { handleHttp } from '../utils/error.handle';

const registerCtrl = async ({ body }: Request, res: Response) => {
  const responseUser = await registerNewUser(body);
  res.send(responseUser);
};

const loginCtrl = async ({ body }: Request, res: Response) => {
  const { email, password } = body;
  const responseUser = await loginUser({ email, password });

  if (responseUser === 'PASSWORD_INCORRECT') {
    res.status(403);
    res.send(responseUser);
  } else {
    res.send(responseUser);
  }
};

const perfilCtrl = async (req: MySpecificRequest, res: Response) => {
  try {
      const { id } = req.params;
      const { intervaloMinutos, ...rest } = req.body;

      // Actualiza el intervalo de minutos solo si se proporciona
      if (intervaloMinutos !== undefined) {
          // Lógica para validar el valor del intervaloMinutos si es necesario
      }

      const response = await updatePerfil(id, { intervaloMinutos, ...rest });
      res.send(response);
  } catch (e) {
      handleHttp(res, 'ERROR_UPDATE');
  }
};

export { loginCtrl, registerCtrl, perfilCtrl, MySpecificRequest };