import { PaletaTeste } from "@/repository/local-de-teste/pelata"
import { beforeEach, describe, expect, it} from "vitest"
import { ListarPaletas } from "./index"
import { BuscaSemResultados } from "@/erros/buscaSemResultado"
import { randomUUID } from "crypto"

describe("Buscar paletas de cores", () => {
    
	let repository_paletaTeste: PaletaTeste
	let service_listaPaleta: ListarPaletas

	beforeEach(() => {
		repository_paletaTeste = new PaletaTeste()
		service_listaPaleta = new ListarPaletas(repository_paletaTeste)
	})


	it("as buscar por categorias estão gerando resultados", async () => {

		repository_paletaTeste.baseTest.push(
			{
				id: randomUUID(),
				name: "Color Collection3",
				category: "personalizada",
				favorite: "false",
				colors: "111111-222222-333333-444444",
				foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
			},
			{
				id: randomUUID(),
				name: "Rifa online",
				category: "personalizada",
				favorite: "false",
				colors: "111111-222222-333333-444444",
				foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
			}
		)

		const buscaGenerica = await service_listaPaleta.buscandoPorCategoria({category: "all"})
		const buscaPersonalizada = await service_listaPaleta.buscandoPorCategoria({category: "personalizada"})

		expect(buscaGenerica.paletas.length).toBeGreaterThan(0)
		expect(buscaPersonalizada.paletas.length).toBeGreaterThan(0)

	})


	it("a busca pelo nome de uma paleta esta gerando resultado", async () => {

		repository_paletaTeste.baseTest.push(
			{
				id: randomUUID(),
				name: "Color Collection3",
				category: "personalizada",
				favorite: "false",
				colors: "111111-222222-333333-444444",
				foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
			},
			{
				id: randomUUID(),
				name: "Rifa online",
				category: "personalizada",
				favorite: "false",
				colors: "111111-222222-333333-444444",
				foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
			}
		)

		const buscaGenerica = await service_listaPaleta.buscandoPorNome({name: "Color Collection3"})
		const buscaPersonalizada = await service_listaPaleta.buscandoPorNome({name: "Rifa online"})

		expect(buscaGenerica.paleta.name).toEqual("Color Collection3")
		expect(buscaPersonalizada.paleta.name).toEqual("Rifa online")

	})


	it("avisa quando não encontrar nada nas buscas", async () => {

		await expect(
			service_listaPaleta.buscandoPorCategoria({category: "all"})
		).rejects.toBeInstanceOf(BuscaSemResultados)

		await expect(
			service_listaPaleta.buscandoPorNome({name: "Rifa online"})
		).rejects.toBeInstanceOf(BuscaSemResultados)
	})

})