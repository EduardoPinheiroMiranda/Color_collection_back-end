import { PaletaTeste } from "@/repository/local-de-teste/pelata"
import { describe, it, expect, beforeAll } from "vitest"
import { DeletarPaleta } from "."
import { ErroDeValidacao } from "@/erros/erroDeValidacao"
import { BuscaSemResultados } from "@/erros/buscaSemResultado"

describe("Deletar paleta", () =>{

	let repository_pelatTeste: PaletaTeste
	let service_deletarPaleta: DeletarPaleta

	beforeAll(() => {
		repository_pelatTeste = new PaletaTeste()
		service_deletarPaleta = new DeletarPaleta(repository_pelatTeste)

		repository_pelatTeste.paletas_baseTest.push({
			id: "teste",
			name: "Color Collection3",
			category: "personalizada",
			favorite: "false",
			colors: "111111-222222-333333-444444",
			foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
		})

	})


	it("Dispara erro quando a o id não encontra um valor correspondente", async () => {
		
		await expect(service_deletarPaleta.execut({
			id: "teste",
			fraseDeExclusao: "fraze/errada"
		})
		).rejects.toBeInstanceOf(BuscaSemResultados)

	})


	it("Dispara erro quando a frase de exclusão está errada", async () => {
		
		await expect(service_deletarPaleta.execut({
			id: "teste",
			fraseDeExclusao: "fraze/errada"
		})
		).rejects.toBeInstanceOf(ErroDeValidacao)

	})


	it("A exclusão está sendo feita corretamente", async () => {

		const {resposta} = await service_deletarPaleta.execut({
			id: "teste",
			fraseDeExclusao: "COLOR COLLECTION3/PERSONALIZADA"
		})
		
		expect(resposta).toEqual("Paleta deletada com sucesso")

	})

})