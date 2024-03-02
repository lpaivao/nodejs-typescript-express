import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pool from "./../../database"; // Importando o pool de conexão com o banco de dados


export const getAll = async (req: Request, res: Response) => {

	try {
		// Executar a consulta SQL para buscar todos os usuários
		const queryResult = await pool.query("SELECT * FROM usuario");

		// Extrair os dados dos usuários do resultado da consulta
		const users = queryResult.rows;

		// Retornar os usuários encontrados
		res.json(users);
	} catch (error) {
		console.error("Erro ao buscar usuários:", error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erro ao buscar usuários" });
	}
};