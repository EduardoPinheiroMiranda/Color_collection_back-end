import { ModeloDeRequisicoesParaPaleta } from "@/repository/pelatas"

interface TipoDaBusca{
    category: string
}

export class ListarPaletas{

	constructor(private requisicaoAoBanco: ModeloDeRequisicoesParaPaleta){}

	async execut(
		{
			category

		}: TipoDaBusca
	){
		const paletas = await this.requisicaoAoBanco.getPallet(category)

		return {
			paletas
		}
	}
}