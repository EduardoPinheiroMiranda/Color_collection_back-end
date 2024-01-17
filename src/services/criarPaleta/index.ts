import { PaletaExistente } from "@/erros/paletaExistente"
import { ModeloDeRequisicoesParaPaleta } from "@/repository/interface"
import { Prisma } from "@prisma/client"


interface ModeloDePaleta{

    name: string
    category: string
    favorite: string
    colors: string
    foreigKey_user: string
}

export class CriarPaleta{

	constructor( private requisicaoAoBanco: ModeloDeRequisicoesParaPaleta){}

	// async execut({
	// 	name,
	// 	category,
	// 	favorite,
	// 	colors,
	// 	foreigKey_user
	// }: ModeloDePaleta){

	// 	const paletaExiste = await this.requisicaoAoBanco.findByName(name)

	// 	if(!paletaExiste){
	// 		throw new PaletaExistente()
	// 	}

	// 	const peleta = await this.requisicaoAoBanco.create({
			
	// 	})

	// 	return paleta
	// }
}