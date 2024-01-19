import { Pallet, Prisma } from "@prisma/client"

export interface ModeloDeRequisicoesParaPaleta{

    create(data: Prisma.PalletUncheckedCreateInput): Promise<Pallet>

    findByName(name: string): Promise<Pallet | null>
}