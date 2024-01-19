import { FastifyInstance } from "fastify"

import { criarUsuario } from "../controllers/criaUsuario"
import { criarPaletaDeCores } from "../controllers/criarPaletaDeCor"

export async function routers(app: FastifyInstance){

	app.post("/criarUsuario", criarUsuario)
	app.post("/criarPaleta", criarPaletaDeCores)
	
}