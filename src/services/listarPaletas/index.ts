import { BuscaSemResultados } from "@/erros/buscaSemResultado"
import { ModeloDeRequisicoesParaPaleta } from "@/repository/pelatas"

interface CategoriaDaBusca{
    category: string
}

interface NomeDaBusca{
	name: string
}

export class ListarPaletas{

	constructor(private requisicaoAoBanco: ModeloDeRequisicoesParaPaleta){}

	async buscandoPorCategoria(
		{
			category
		}: CategoriaDaBusca
	){

		const paletas = await this.requisicaoAoBanco.getPallet(category)


		if(!paletas){
			throw new BuscaSemResultados()
		}

		return {
			paletas
		}
	}

	async buscandoPorNome(
		{
			name
		}: NomeDaBusca
	){

		const paleta = await this.requisicaoAoBanco.findByName(name)

		if(!paleta){
			throw new BuscaSemResultados()
		}

		return { 
			paleta
		}
	}
}