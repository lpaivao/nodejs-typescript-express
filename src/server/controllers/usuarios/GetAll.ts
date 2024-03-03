import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Usuario } from "../../database/entities/usuario"; // Importando a entidade Usuario
import { AppDataSource } from "../../database/data-source";

export const getAll = async (req: Request, res: Response) => {
	try {
		// Recuperar todos os usuários do banco de dados usando o TypeORM
		const userRepository = AppDataSource.getRepository(Usuario);
		const users = await userRepository.find();

		// Retornar os usuários encontrados
		res.json(users);
	} catch (error) {
		console.error("Erro ao buscar usuários:", error);
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erro ao buscar usuários" });
	}
};