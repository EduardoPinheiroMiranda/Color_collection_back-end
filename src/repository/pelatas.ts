import { Pallet, Prisma } from "@prisma/client"

export interface ModeloDeRequisicoesParaPaleta{

    create(data: Prisma.PalletUncheckedCreateInput): Promise<Pallet>

    update(id: string, data:Prisma.PalletUncheckedUpdateManyInput): Promise<Pallet>

    findByName(name: string): Promise<Pallet | null>

    getById(id: string): Promise<Pallet | null>

    getPallet(category: string): Promise< Pallet[] | null>

    delite(id: string): Promise< string >
}