import { RequestToDatabase } from "@/repository/prisma/requestToDatabase"
import { CriarUsuario } from "@/services/CriarUsuario"


export default function makeCriarUsuario(){

	const repository_prisma = new RequestToDatabase()
	const service_CriarUsuario = new CriarUsuario(repository_prisma)

	return service_CriarUsuario
}