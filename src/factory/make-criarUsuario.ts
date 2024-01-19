import { RequisicoesDoUsuario } from "@/repository/prisma/usuario"
import { CriarUsuario } from "@/services/CriarUsuario"

export function makeCriarUsuario(){

	const repositoryPrisma_criarUsuario = new RequisicoesDoUsuario()
	const service_criarUsuario = new CriarUsuario(repositoryPrisma_criarUsuario)

	return service_criarUsuario
}