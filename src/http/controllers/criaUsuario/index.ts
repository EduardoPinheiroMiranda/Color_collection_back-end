import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { RequestToDatabase } from "@/repository/prisma/requestToDatabase"
import { CriarUsuario } from "@/services/CriarUsuario"
import { EmailExistente } from "@/erros/emailExistente"

export async function criarUsuario(request: FastifyRequest, reply: FastifyReply){
	
	const padraoDeCadastroDoUsuario = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	})


	const {name, email, password} = padraoDeCadastroDoUsuario.parse(request.body)

	try{

		const repository_prisma = new RequestToDatabase()
		const service_CriarUsuario = new CriarUsuario(repository_prisma)

		await service_CriarUsuario.execut({
			name,
			email,
			password
		})

		

	}catch(erro){
		if(erro instanceof EmailExistente){
			return reply.status(409).send({
				aviso: "este email já está em uso."
			})
		}
	}

	return reply.status(201).send()


}