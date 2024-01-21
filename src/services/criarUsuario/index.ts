import { EmailExistente } from "@/erros/emailExistente"
import { ModeloDeRequisicoesParaUsuario } from "@/repository/usuario"
import Bcripyt from "bcryptjs"

interface ModeloDeUsuario{
    name: string
    email: string
    password: string
}

export class CriarUsuario{
	constructor( private requisicaoAoBanco: ModeloDeRequisicoesParaUsuario){}

	async execut({
		name,
		email,
		password
	}:ModeloDeUsuario){
        
		const password_hash = await Bcripyt.hash(password, 6)

		const usuarioExiste = await this.requisicaoAoBanco.findByEmail(email)

		if(usuarioExiste){
			throw new EmailExistente()
		}

		const user = await this.requisicaoAoBanco.create({
			name,
			email,
			password_hash
		})

		return {
			user
		}

	}

}