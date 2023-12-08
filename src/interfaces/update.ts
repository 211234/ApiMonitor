import { Request } from "express";
export interface MySpecificRequest extends Request {
    body: {
        name?: string;
        phone?: string;
        email?: string;
        password?: string;
        intervaloMinutos?: number;
    };
    params: {
        id: string;
    };
}