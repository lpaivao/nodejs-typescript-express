import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Usuario } from "../../database/entities/usuario"; // Importando a entidade Usuario
import { AppDataSource } from "../../database/data-source";

export const update = async (req: Request, res: Response) => {
	try {
		const id = parseInt(req.params.id);
		const userRepository = AppDataSource.getRepository(Usuario);
		const user = await userRepository.findOneBy({ id:id });

		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({message: "Usuario nao encontrado"});
		}

		const { nome, cpf, data_nasc } = req.body;

		const userUpdated = await userRepository.update(id, {nome: nome, cpf: cpf, data_nasc: data_nasc});

		if(!userUpdated){
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Usuario nao atualizado"});
		}

		return res.status(StatusCodes.OK).json({message: "Usuario atualizado"});
	} catch (error) {
		console.error("Erro ao buscar usuários:", error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erro ao buscar usuários" });
	}
};  