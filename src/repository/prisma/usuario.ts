import { Prisma } from "@prisma/client"
import { ModeloDeRequisicoesParaUsuario } from "../usuario"
import { prisma } from "@/lib/prisma"

export class RequisicoesDoUsuario implements ModeloDeRequisicoesParaUsuario{
    
	async create(data: Prisma.UserCreateInput){
        
		const user = await prisma.user.create({
			data,
		})

		return user
	}

	async findByEmail(email: string){
        
		const user = await prisma.user.findUnique({
			where:{
				email
			}
		})

		return user
	}
}