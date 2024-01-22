import { BuscaSemResultados } from "@/erros/buscaSemResultado"
import { PaletaExistente } from "@/erros/paletaExistente"
import { ModeloDeRequisicoesParaPaleta } from "@/repository/pelatas"

interface ModeloDeAtualizacao{
    id: string
    name: string
    category: string
    colors: string
}


export class AtualizarPaleta{

	constructor(private requisicaoAoBanco: ModeloDeRequisicoesParaPaleta){}

	async execut(
		{
			id,
			name,
			category,
			colors
            
		}:ModeloDeAtualizacao
	){
		
		const atualizarPaleta  = await this.requisicaoAoBanco.getById(id)
		
		if(!atualizarPaleta){
			throw new BuscaSemResultados		
		}


		const nomeExist = await this.requisicaoAoBanco.findByName(name)

		if(nomeExist && atualizarPaleta.name != nomeExist.name){
			throw new PaletaExistente
		}


		const novaPaleta = await this.requisicaoAoBanco.update(id, {
			name,
			category,
			colors,
		})

		return {
			novaPaleta
		}
	}
}