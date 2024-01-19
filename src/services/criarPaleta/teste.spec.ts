import { beforeEach, describe, expect, it} from "vitest"

import { PaletaTeste } from "@/repository/local-de-teste/pelata"
import { CriarPaleta } from "./index"
import { PaletaExistente } from "@/erros/paletaExistente"
import { CoresInvalidas } from "@/erros/coresInvalidas"



describe("Criação de paletas de cores", () => {

	let repository_paletaTeste: PaletaTeste
	let service_criarPaleta: CriarPaleta


	beforeEach(() => {
		repository_paletaTeste = new PaletaTeste()
		service_criarPaleta = new CriarPaleta(repository_paletaTeste)
	})


	it("o nome ja esta em uso", async () =>{
        
		await repository_paletaTeste.create({
			name: "Color Collection3",
			category: "personalizada",
			favorite: "false",
			colors: "111111-222222-333333-444444",
			foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
		})

		await expect( 
			service_criarPaleta.execut({
				name: "Color Collection3",
				category: "personalizada",
				favorite: "false",
				colors: "111111-222222-333333-444444",
				foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
			})
		).rejects.toBeInstanceOf(PaletaExistente)
	})


	it("os valores das cores estão corretos", async () =>{
        
		await expect( 
			service_criarPaleta.execut({
				name: "Color Collection3",
				category: "personalizada",
				favorite: "false",
				colors: "111111-222222-333333-44444",
				foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
			})
		).rejects.toBeInstanceOf(CoresInvalidas)
	})


	it("a criação da paleta de cores está correta", async () =>{
        
		const paleta = await repository_paletaTeste.create({
			name: "Color Collection3",
			category: "personalizada",
			favorite: "false",
			colors: "111111-222222-333333-444444",
			foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
		})

		expect(paleta.name).toEqual("Color Collection3")
	})
})