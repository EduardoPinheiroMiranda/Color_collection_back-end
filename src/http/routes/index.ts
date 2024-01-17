import { FastifyInstance } from "fastify"

import { criarUsuario } from "../controllers/criaUsuario"

export async function routers(app: FastifyInstance){
	app.post("/criarUsuario", criarUsuario)
}