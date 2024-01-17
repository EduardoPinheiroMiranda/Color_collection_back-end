import { RequisicoesDoUsuario } from "@/repository/prisma/usuario"
import { CriarUsuario } from "@/services/CriarUsuario"


export default function makeCriarUsuario(){

	const repository_prisma = new RequisicoesDoUsuario()
	const service_CriarUsuario = new CriarUsuario(repository_prisma)

	return service_CriarUsuario
}