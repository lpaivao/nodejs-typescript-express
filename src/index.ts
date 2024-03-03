import {server} from "./server/Server";
import { AppDataSource } from "./server/database/data-source";

server.listen(process.env.PORT || 3000, () => console.log(`Escutando na porta ${process.env.PORT}`));