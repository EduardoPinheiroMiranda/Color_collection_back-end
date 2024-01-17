import { ModeloDeRequisicaoAoBanco } from "@/repository/interface"
import Bcripyt from "bcryptjs"

interface CadastroDeUsuario{
    name: string
    email: string
    password: string
}

export class CriarUsuario{
	constructor( private requisicaoAoBanco: ModeloDeRequisicaoAoBanco){}

	async execut({
		name,
		email,
		password
	}:CadastroDeUsuario){
        
		const password_hash = await Bcripyt.hash(password, 6)

		const usuarioExiste = await this.requisicaoAoBanco.findByEmail(email)

		if(!usuarioExiste){
			throw new Error("Este email já está em uso")
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