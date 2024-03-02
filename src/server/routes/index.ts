import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (req, res) => {
	return res.send("Pagina inicial funcionando!");
});

router.post("/", (req, res) => {
	// Retornando o próprio body na resposta
	const body = res.json(req.body);

	return body;
});

router.get("/status", (req, res) => {
	// Retornando com status code
	return res.status(StatusCodes.OK).send("Status: 200");
});

export { router };