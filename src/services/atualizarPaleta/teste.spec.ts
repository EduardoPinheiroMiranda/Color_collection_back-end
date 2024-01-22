import { beforeEach, describe, expect, it } from "vitest"
import { AtualizarPaleta } from "."
import { PaletaTeste } from "@/repository/local-de-teste/pelata"
import { BuscaSemResultados } from "@/erros/buscaSemResultado"
import { PaletaExistente } from "@/erros/paletaExistente"


describe("Atualizando paleta de cores", () => {

	let repository_pelatTeste: PaletaTeste
	let service_atualizaPaleta: AtualizarPaleta

	beforeEach(() => {
		repository_pelatTeste = new PaletaTeste()
		service_atualizaPaleta = new AtualizarPaleta(repository_pelatTeste)
	})

	it("A verificação de nomes não permite duplicatas", async () => {

		repository_pelatTeste.paletas_baseTest.push({
			id: "teste001",
			name: "Rifa online",
			category: "personalizada",
			favorite: "false",
			colors: "111111-222222-333333-444444",
			foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
		},
		{
			id: "teste002",
			name: "Color Collection",
			category: "personalizada",
			favorite: "false",
			colors: "111111-222222-333333-444444",
			foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
		})

		await expect(service_atualizaPaleta.execut(
			{
				id: "teste001",
				name: "Color Collection",
				category: "triade",
				colors: "111111-222222-333333"
			}
		)).rejects.toBeInstanceOf(PaletaExistente)

		
        
	})

	it("A busca da paleta pelo id está funcionando", async () => {

		repository_pelatTeste.paletas_baseTest.push({
			id: "teste001",
			name: "Rifa online",
			category: "personalizada",
			favorite: "false",
			colors: "111111-222222-333333-444444",
			foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
		})

		await expect(service_atualizaPaleta.execut(
			{
				id: "idErrado",
				name: "Rifa online",
				category: "triade",
				colors: "111111-222222-333333"
			}
		)).rejects.toBeInstanceOf(BuscaSemResultados)
        
	})

	it("A atualização está sendo bem sucedida", async () => {

		repository_pelatTeste.paletas_baseTest.push({
			id: "teste001",
			name: "Rifa online",
			category: "personalizada",
			favorite: "false",
			colors: "111111-222222-333333-444444",
			foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
		})

		await service_atualizaPaleta.execut({
			id: "teste001",
			name: "Rifa online",
			category: "triade",
			colors: "111111-222222-333333"
		})

		const paletaAtualizada = repository_pelatTeste.paletas_baseTest.find((paleta) => {
			if(paleta.id === "teste001"){
				return paleta
			}
		})

		expect(paletaAtualizada).toEqual({
			id: "teste001",
			name: "Rifa online",
			category: "triade",
			favorite: "false",
			colors: "111111-222222-333333",
			foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1",
		})
        
	})
})
