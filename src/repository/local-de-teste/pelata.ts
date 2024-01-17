import { Prisma, User } from "@prisma/client"
import { ModeloDeRequisicoesParaPaleta } from "../interface"
import { randomUUID } from "crypto"


export class PaletaTeste implements ModeloDeRequisicoesParaPaleta{

	public users: User[] = []

    
	async create(data: Prisma.PalletCreateInput){
		
		const newUser = {
			
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