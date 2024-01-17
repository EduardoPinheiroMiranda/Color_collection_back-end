import { Prisma } from "@prisma/client"
import { ModeloDeRequisicaoAoBanco } from "../interface"
import { prisma } from "@/lib/prisma"

export class RequestToDatabase implements ModeloDeRequisicaoAoBanco{
    
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