import express from "express";
import { router } from "./routes";

const server = express();

// Para indicar que os dados trabalhados são json
server.use(express.json());

// Chama as rotas de outro arquivo
server.use(router);

export {server};