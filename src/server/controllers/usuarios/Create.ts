import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export const create = (req: Request, res: Response) => {

	return res.status(StatusCodes.CREATED).send("Created!");
};