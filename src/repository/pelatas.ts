import { Pallet, Prisma } from "@prisma/client"

export interface ModeloDeRequisicoesParaPaleta{

    create(data: Prisma.PalletUncheckedCreateInput): Promise<Pallet>

    findByName(name: string): Promise<Pallet | null>

    getById(id: string): Promise<Pallet | null>

    getPallet(category: string): Promise< Pallet[] | null>
}