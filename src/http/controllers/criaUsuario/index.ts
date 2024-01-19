import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

import { EmailExistente } from "@/erros/emailExistente"
import { makeCriarUsuario } from "@/factory/make-criarUsuario"

export async function criarUsuario(request: FastifyRequest, reply: FastifyReply){
	
	const padraoDeCadastroDoUsuario = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6)
	})


	const {name, email, password} = padraoDeCadastroDoUsuario.parse(request.body)

	try{

		const service_CriarUsuario = makeCriarUsuario()

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