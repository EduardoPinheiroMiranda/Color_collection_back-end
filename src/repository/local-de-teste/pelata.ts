import { Prisma, Pallet } from "@prisma/client"
import { ModeloDeRequisicoesParaPaleta } from "../pelatas"
import { randomUUID } from "crypto"


export class PaletaTeste implements ModeloDeRequisicoesParaPaleta{

	public paletas_baseTest: Pallet[] = []

    
	async create(data: Prisma.PalletUncheckedCreateInput){

		const pallet = {
			id: randomUUID(),
			name: data.name,
			category: data.category,
			favorite: data.favorite,
			colors: data.colors,
			foreignKey_userId: data.foreignKey_userId
		}

		this.paletas_baseTest.push(pallet)

		return pallet
	}

	async update(id: string, data: Prisma.PalletCreateInput){

		const paletaAtualizada = this.paletas_baseTest.map((paleta) => {

			if(paleta.id === id){
				paleta.name = data.name
				paleta.category = data.category
				paleta.colors = data.colors
			}

			return paleta
		})

		const newDataBase = this.paletas_baseTest.filter((paleta) => paleta.id !== id)

		newDataBase.push(paletaAtualizada[0])
		newDataBase.forEach((paleta) => {
			this.paletas_baseTest.push(paleta)
		})
		
		return paletaAtualizada[0]
		
	}

	async findByName(name: string){
        
		const paleta = this.paletas_baseTest.find((paleta)=> name === paleta.name)

		if(!paleta){
			return null
		}

		return paleta
	}

	async getPallet(category: string){

		if(category === "all"){
			const paletas = this.paletas_baseTest.filter((paleta) => paleta)
			
			return paletas.length == 0 ? null : paletas
		}
		

		const paletas = this.paletas_baseTest.filter((paleta) => paleta.category === category)
		return paletas

	}

	async getById(id: string){
		
		const paleta = this.paletas_baseTest.find((paleta) => paleta.id === id)

		if(!paleta){
			return null
		}

		return paleta
	}

	async delite(id: string){
		
		const excluirPaleta = this.paletas_baseTest.filter((paleta) => {
			
			const newList = []

			if(paleta.id !== id){
				newList.push(paleta)
			}
			
			return newList
		})

		this.paletas_baseTest = excluirPaleta

		return "Paleta deletada com sucesso"
	}
	
}