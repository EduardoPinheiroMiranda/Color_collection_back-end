import { PaletaTeste } from "@/repository/local-de-teste/pelata"
import { beforeEach, describe, expect, it} from "vitest"
import { ListarPaletas } from "./index"

describe("Buscar paletas de cores", () => {
    
	let repository_paletaTeste: PaletaTeste
	let service_listaPaleta: ListarPaletas

	beforeEach(() => {
		repository_paletaTeste = new PaletaTeste()
		service_listaPaleta = new ListarPaletas(repository_paletaTeste)
	})

    
	it("a busca por paletas esta coreta", async () => {

		await repository_paletaTeste.create({
			name: "Color Collection3",
			category: "personalizada",
			favorite: "false",
			colors: "111111-222222-333333-444444",
			foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
		})

		await repository_paletaTeste.create({
			name: "Color Collection3",
			category: "personalizada",
			favorite: "false",
			colors: "111111-222222-333333-444444",
			foreignKey_userId: "29b1f196-982b-4fa8-962b-4c6ef09379c1"
		})

		const paletas = await service_listaPaleta.execut({category: "all"})
        
		expect(paletas.paletas?.length).toEqual(2)
	})
       
})