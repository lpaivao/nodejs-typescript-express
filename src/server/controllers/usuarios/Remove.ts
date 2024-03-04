import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Usuario } from "../../database/entities/usuario"; // Importando a entidade Usuario
import { AppDataSource } from "../../database/data-source";

export const remove = async (req: Request, res: Response) => {
    
	try{
		const id = parseInt(req.params.id);
		const userRepository = AppDataSource.getRepository(Usuario);
		const user = await userRepository.findOneBy({id: id});

		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({message: "Usuario nao encontrado"});
		}

		const removedUser = await userRepository.remove(user);

		if (!removedUser){
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "Usuario nao removido"});
		}

		return res.status(StatusCodes.OK).json(removedUser);
        
	} catch (error) {
		console.error("Erro ao remover usuário:", error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erro ao buscar usuários" });
	}

    
};