import { ErroDeValidacao } from "@/erros/erroDeValidacao"
import { PaletaExistente } from "@/erros/paletaExistente"
import { ModeloDeRequisicoesParaPaleta } from "@/repository/pelatas"

interface ModeloDeAtualizacao{
    id: string
    name: string
    category: string
    colors: string
}


export class AtualizarUsuario{
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
			throw new ErroDeValidacao
		}

		const nomeExist = await this.requisicaoAoBanco.findByName(name)

		if(nomeExist){
			throw new PaletaExistente
		}

        
        
	}
}