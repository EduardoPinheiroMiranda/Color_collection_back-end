import { Prisma } from "@prisma/client"
import { ModeloDeRequisicoesParaPaleta } from "../interface"
import { prisma } from "@/lib/prisma"

export class RequisicoesDaPaleta implements ModeloDeRequisicoesParaPaleta{
    
	async create(data: Prisma.PalletCreateInput){
		
		const paleta = await prisma.pallet.create({
			data,
		})

		return paleta
	}
	
    
	async findByName(name: string){
		const paleta = await prisma.pallet.findUnique({
			where: {
				name
			}
		})

		return paleta
	}
    
	
}