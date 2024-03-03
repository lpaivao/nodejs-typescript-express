import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { UsuariosController } from "./../controllers";
import { pool } from "../database/data-base";

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

// teste com controller
router.post("/usuarios", UsuariosController.create);

// get all usuarios
router.get("/usuarios", UsuariosController.getAll);

// Rota para testar a conexão com o banco de dados
router.get("/test-db-connection", async (req, res) => {
	try {
		const client = await pool.connect();
		const message = { message: "Conexão com o banco de dados estabelecida com sucesso" };
		res.json(message);
		client.release();
	} catch (error) {
		console.error("Erro ao conectar ao banco de dados:", error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erro ao conectar ao banco de dados" });
	}
});


export { router };