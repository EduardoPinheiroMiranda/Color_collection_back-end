import { Pallet, Prisma, User } from "@prisma/client"

export interface ModeloDeRequisicoesParaUsuario{
    
	create(data: Prisma.UserCreateInput): Promise<User>

    findByEmail(email: string): Promise<User | null>
}


export interface ModeloDeRequisicoesParaPaleta{

    create(data: Prisma.PalletCreateInput): Promise<Pallet>

    findByName(name: string): Promise<Pallet | null>
}