import { Prisma, User } from "@prisma/client"
import { ModeloDeRequisicoesParaUsuario } from "../usuario"
import { randomUUID } from "crypto"


export class UsuarioTeste implements ModeloDeRequisicoesParaUsuario{

	public baseTest: User[] = []

    
	async create(data: Prisma.UserCreateInput){
		
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			avatar: null,
		}

		this.baseTest.push(user)

		return user
	}

	async findByEmail(email: string){
        
		const user = this.baseTest.find((user)=> email === user.email)

		if(!user){
			return null
		}

		return user
	}
	
}