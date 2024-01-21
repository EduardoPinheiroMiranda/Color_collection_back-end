import { ErroDeValidacao } from "@/erros/erroDeValidacao"
import { ModeloDeRequisicoesParaUsuario } from "@/repository/usuario"
import { compare } from "bcryptjs"

interface PadraoDeAutenticacao{
    email: string
    password_hash: string
}

export class AutenticacaoDeUsuario{
	constructor(private requisaoAoBanco: ModeloDeRequisicoesParaUsuario){}

	async execut({
		email,
		password_hash
	}: PadraoDeAutenticacao){
        
		const usuarioExiste = await this.requisaoAoBanco.findByEmail(email)

		if(!usuarioExiste){
			throw new ErroDeValidacao()
		}


		const senhaEhValida = await compare(password_hash, usuarioExiste.password_hash)

		if(!senhaEhValida){
			throw new ErroDeValidacao()
		}

		
		return {
			usuarioExiste
		}
	}
}