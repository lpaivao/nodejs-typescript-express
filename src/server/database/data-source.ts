import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Usuario } from "./entities/usuario";
import { Projeto } from "./entities/projeto";
import { CreateUsuario1709447343994 } from "./migrations/1709447343994-CreateUsuario";
import { CreateProjeto1709447353226 } from "./migrations/1709447353226-CreateProjeto";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Configurar o TypeORM para usar a conexão existente do pool do PostgreSQL
export const AppDataSource = new DataSource({
	type: "postgres",
	url: process.env.DB_URI,
	synchronize: true,
	logging: false,
	entities: [Usuario, Projeto],
	migrations: [CreateUsuario1709447343994, CreateProjeto1709447353226],
	installExtensions: true,
});

// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
	.then(() => {
		// here you can start to work with your database
	})
	.catch((error) => console.log(error));