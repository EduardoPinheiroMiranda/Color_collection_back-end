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
	
    
	async findByName(name: string){
		const paleta = await prisma.pallet.findUnique({
			where: {
				name
			}
		})

		return paleta
	}
    
	
}