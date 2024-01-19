import { CriarPaleta } from "@/services/criarPaleta"
import { RequisicoesDaPaleta } from "@/repository/prisma/paletaDeCores"

export function makeCriarPaletas(){
    
	const repositoryPrisma_criarPaleta = new RequisicoesDaPaleta()
	const service_criarPaleta = new CriarPaleta(repositoryPrisma_criarPaleta)

	return service_criarPaleta
}