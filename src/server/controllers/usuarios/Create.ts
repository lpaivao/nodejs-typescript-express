import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import pool from "./../../database";
import { usuario } from "./../../entities/usuario";

// Função para verificar se um usuário já existe com o mesmo CPF
async function usuarioExiste(cpf: string): Promise<boolean> {
	const query = "SELECT COUNT(*) AS count FROM usuario WHERE cpf = $1";
	const result = await pool.query(query, [cpf]);
	return parseInt(result.rows[0].count) > 0;
}

// Função para criar um novo usuário no banco de dados
export const create = async (req: Request, res: Response): Promise<void | Response<unknown, Record<string, unknown>>> => {
	try {
		const novoUsuario: usuario = req.body; // Assume que o corpo da requisição contém os dados do novo usuário
		const { nome, cpf, data_nasc } = novoUsuario;
        
		// Verificar se o usuário já existe com o mesmo CPF
		const usuarioExistente = await usuarioExiste(cpf);
		if (usuarioExistente) {
			return res.status(400).json({ message: "Já existe um usuário com o mesmo CPF" });
		}

		const query = "INSERT INTO usuario (nome, cpf, data_nasc) VALUES ($1, $2, $3)";
		await pool.query(query, [nome, cpf, data_nasc]);
		console.log("Novo usuário criado com sucesso");

		res.status(StatusCodes.CREATED).json({ message: "Novo usuário criado com sucesso" });
	} catch (error) {
		console.error("Erro ao criar novo usuário:", error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erro ao criar novo usuário" });
	}
};