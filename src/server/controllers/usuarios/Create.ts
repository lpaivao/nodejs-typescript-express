import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Usuario } from "../../database/entities/usuario"; // Importando a entidade Usuario
import { AppDataSource } from "../../database/data-source";

// Função para verificar se um usuário já existe com o mesmo CPF
async function usuarioExiste(cpf: string): Promise<boolean> {
	const userRepository = AppDataSource.getRepository(Usuario);
	const existingUser = await userRepository.findOne({ where: { cpf } });
	return !!existingUser;
}

// Função para criar um novo usuário no banco de dados
export const create = async (req: Request, res: Response): Promise<void | Response<unknown, Record<string, unknown>>> => {
	try {
		const novoUsuario: Usuario = req.body; // Assume que o corpo da requisição contém os dados do novo usuário
		const { nome, cpf, data_nasc } = novoUsuario;

		// Verificar se o usuário já existe com o mesmo CPF
		const usuarioExistente = await usuarioExiste(cpf);
		if (usuarioExistente) {
			return res.status(StatusCodes.BAD_REQUEST).json({ message: "Já existe um usuário com o mesmo CPF" });
		}

		const userRepository = AppDataSource.getRepository(Usuario);
		await userRepository.save(novoUsuario);

		console.log("Novo usuário criado com sucesso");
		res.status(StatusCodes.CREATED).json({ message: "Novo usuário criado com sucesso" });
	} catch (error) {
		console.error("Erro ao criar novo usuário:", error);
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Erro ao criar novo usuário" });
	}
};
