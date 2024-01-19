import { CoresInvalidas } from "@/erros/coresInvalidas"
import { PaletaExistente } from "@/erros/paletaExistente"
import { ModeloDeRequisicoesParaPaleta } from "@/repository/pelatas"


interface ModeloDePaleta{

    name: string
    category: string
    favorite: string
    colors: string
    foreignKey_userId: string
}

export class CriarPaleta{

	constructor( private requisicaoAoBanco: ModeloDeRequisicoesParaPaleta){}

	async execut({
		foreignKey_userId,
		name,
		category,
		favorite,
		colors,
	}: ModeloDePaleta){

		//reprovando nomes duplicados
		const paletaExiste = await this.requisicaoAoBanco.findByName(name)

		if(paletaExiste){
			throw new PaletaExistente()
		}

		//verificando estrutura dos valores em cores
		const coresValidas = colors.split("-")

		if(coresValidas.length > 5){
			throw new CoresInvalidas()
		}

		coresValidas.forEach((color) => {
			if(color.length != 3 && color.length != 6){
				throw new CoresInvalidas()
			}
		})

		
		const paleta = await this.requisicaoAoBanco.create({
			name,
			category,
			favorite,
			colors,
			foreignKey_userId
		})

		return {
			paleta
		}
	}
}