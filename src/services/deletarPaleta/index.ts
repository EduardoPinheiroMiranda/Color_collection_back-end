import { BuscaSemResultados } from "@/erros/buscaSemResultado"
import { ErroDeValidacao } from "@/erros/erroDeValidacao"
import { ModeloDeRequisicoesParaPaleta } from "@/repository/pelatas"

interface PadraoDeDadosParaExclusao{
    id: string
    fraseDeExclusao: string
}

export class DeletarPaleta{
	constructor(private requisicaoAoBanco: ModeloDeRequisicoesParaPaleta){}

	async execut({
		id,
		fraseDeExclusao
	}: PadraoDeDadosParaExclusao){

		const paleta = await this.requisicaoAoBanco.getById(id)

		if(!paleta){
			throw new BuscaSemResultados
		}

        
		const frase = paleta?.name + "/" + paleta?.category
		const fraseDeAutenticacao = frase.toUpperCase()

		if(fraseDeAutenticacao !== fraseDeExclusao){
			throw new ErroDeValidacao
		}

		const resposta = await this.requisicaoAoBanco.delite(id)

		return { 
			resposta
		}
	}
}