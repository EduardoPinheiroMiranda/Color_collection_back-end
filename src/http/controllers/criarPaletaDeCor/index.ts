import { FastifyRequest, FastifyReply} from "fastify"
import { z } from "zod"
import { makeCriarPaletas } from "@/factory/make-criarPaleta"
import { PaletaExistente } from "@/erros/paletaExistente"
import { CoresInvalidas } from "@/erros/coresInvalidas"

export async function criarPaletaDeCores(request: FastifyRequest, replay: FastifyReply){

	const padraoDaPaletaDeCores = z.object({
		userId: z.string(),
		name: z.string(),
		category: z.enum(["personalizada", "analoga"]),
		favorite: z.enum(["true", "false"]).default("false"),
		colors: z.string().max(34),
	})

	const { 
		name, 
		category, 
		favorite, 
		colors, 
		userId

	} = padraoDaPaletaDeCores.parse(request.body)


	try{

		const service_criarPaleta = makeCriarPaletas()

		await service_criarPaleta.execut({
			name,
			category,
			favorite,
			colors,
			foreignKey_userId: userId
		})

	}catch(erro){
		if(erro instanceof PaletaExistente){
			return replay.status(409).send({
				erro: "Este nome já esta em uso"
			})
		}

		if(erro instanceof CoresInvalidas){
			return replay.status(400).send({
				erro: "Error: valores das cores invalidos."
			})
		}
	}

	return replay.status(201).send()
}