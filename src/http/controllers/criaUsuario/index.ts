import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { RequestToDatabase } from "@/repository/prisma/requestToDatabase"
import { CriarUsuario } from "@/services/CriarUsuario"

export async function criarUsuario(request: FastifyRequest, reply: FastifyReply){
	
	const padraoDeCadastroDoUsuario = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	})


	const {name, email, password} = padraoDeCadastroDoUsuario.parse(request.body)

	try{

		const prisma_repo = new RequestToDatabase()
		const criarUsuario_service = new CriarUsuario(prisma_repo)

		await criarUsuario_service.execut({
			name,
			email,
			password
		})

		

	}catch(erro){
		console.error(erro)
	}

	return reply.status(201).send()








}