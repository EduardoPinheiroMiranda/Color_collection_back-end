import { Prisma, Pallet } from "@prisma/client"
import { ModeloDeRequisicoesParaPaleta } from "../pelatas"
import { randomUUID } from "crypto"


export class PaletaTeste implements ModeloDeRequisicoesParaPaleta{

	public baseTest: Pallet[] = []

    
	async create(data: Prisma.PalletUncheckedCreateInput){
		
		const pallet = {
			id: randomUUID(),
			name: data.name,
			category: data.category,
			favorite: data.favorite,
			colors: data.colors,
			foreignKey_userId: data.foreignKey_userId
		}

		this.baseTest.push(pallet)

		return pallet
	}

	async findByName(name: string){
        
		const user = this.baseTest.find((paleta)=> name === paleta.name)

		if(!user){
			return null
		}

		return user
	}
	
}