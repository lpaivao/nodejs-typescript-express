import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pool from "./../../database";
import { usuario } from "./../../entities/usuario";

// Função para criar um novo usuário no banco de dados
export const create = async (req: Request, res: Response): Promise<void> => {
	try {
		const novoUsuario: usuario = req.body; // Assume que o corpo da requisição contém os dados do novo usuário
		const { nome, cpf, data_nasc } = novoUsuario;
		const query = "INSERT INTO usuario (nome, cpf, data_nasc) VALUES ($1, $2, $3)";
        
		await pool.query(query, [nome, cpf, data_nasc]);
		console.log("Novo usuário criado com sucesso");

		res.status(StatusCodes.CREATED).json({ message: "Novo usuário criado com sucesso" });
	} catch (error) {
		console.error("Erro ao criar novo usuário:", error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erro ao criar novo usuário" });
	}
};