import { ModeloDeRequisicoesParaPaleta } from "@/repository/pelatas"


interface PadraoDeDados{
	id: string
}

export class FavoritarPaleta{
	constructor(private requisicaoAoBanco: ModeloDeRequisicoesParaPaleta ){}

	async execut({
		id
	}: PadraoDeDados){
        
		const paleta = await this.requisicaoAoBanco.getById(id)

		if(!paleta){
                    throw new Error("paleta não encontrada")
		}

		return paleta
	}
}
