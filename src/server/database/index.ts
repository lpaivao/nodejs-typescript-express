import { Pool } from "pg";
import dotenv from "dotenv";

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

// Configurar a conexão com o banco de dados PostgreSQL
const pool = new Pool({
	connectionString: process.env.DB_URI,
});

export default pool;
