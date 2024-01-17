import { Prisma, User } from "@prisma/client"
import { ModeloDeRequisicaoAoBanco } from "../interface"
import { randomUUID } from "crypto"


export class BancoDeTeste implements ModeloDeRequisicaoAoBanco{

	public users: User[] = []

    
	async create(data: Prisma.UserCreateInput){
		
		const newUser = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			password_hash: data.password_hash,
			avatar: null,
		}

		this.users.push(newUser)

		return newUser
	}

	async findByEmail(email: string){
        
		const user = this.users.find((user)=> email === user.email)

		if(!user){
			return null
		}

		return user
	}
	
}