import { Prisma } from "@prisma/client"
import { ModeloDeRequisicoesParaPaleta } from "../pelatas"
import { prisma } from "@/lib/prisma"

export class RequisicoesDaPaleta implements ModeloDeRequisicoesParaPaleta{
    
	async create(data: Prisma.PalletUncheckedCreateInput){
		
		const paleta = await prisma.pallet.create({
			data
		})

		return paleta
	}
	
	async update(id: string, data: Prisma.PalletCreateInput){
		
		const paletaAtualizada = await prisma.pallet.update({
			where: {
				id
			},
			data
		})

		return paletaAtualizada
	}
    
	async findByName(name: string){
		const paleta = await prisma.pallet.findUnique({
			where: {
				name
			}
		})

		return paleta
	}
    
	async getPallet(category: string){
		
		if(category === "all"){
			const paletas = await prisma.pallet.findMany()
			return paletas
		}

		const paletas = await prisma.pallet.findMany({
			where:{
				category: category
			}
		})
		
		return paletas
	}

	async getById(id: string){
		
		const paleta = await prisma.pallet.findUnique({
			where:{
				id
			}
		})

		if(!paleta){
			return null
		}

		return paleta
	}

	async delite(id: string){
		
		await prisma.pallet.delete({
			where: {
				id
			}
		})

		return "Paleta deletada com sucesso"
	}
	
}