import { FastifyInstance } from "fastify"

import { criarUsuario } from "../controllers/criaUsuario"
import { criarPaletaDeCores } from "../controllers/criarPaletaDeCor"
import { listarPaletas } from "../controllers/listarPaletas"

export async function routers(app: FastifyInstance){

	app.post("/criarUsuario", criarUsuario)
	app.post("/criarPaleta", criarPaletaDeCores)
	app.get("/listarPaletas/:id",listarPaletas )
	
}