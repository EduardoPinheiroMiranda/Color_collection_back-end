import { UsuarioTeste } from "@/repository/local-de-teste/usuario"
import { beforeEach, describe, expect, it } from "vitest"
import { AutenticacaoDeUsuario } from "."
import { randomUUID } from "crypto"
import { hash } from "bcryptjs"
import { ErroDeValidacao } from "@/erros/erroDeValidacao"

describe("Validação de usuário", () => {

	let repository_usuarioTeste: UsuarioTeste
	let service_autenticacaoDeUsuario: AutenticacaoDeUsuario

	beforeEach(() => {
		repository_usuarioTeste = new UsuarioTeste()
		service_autenticacaoDeUsuario = new AutenticacaoDeUsuario(repository_usuarioTeste)
	})

	it("se ele aponta erro na validação do email", async () => {

		await expect(
			service_autenticacaoDeUsuario.execut({
				email: "emailErrado@teste.com",
				password_hash: "123456"
			})
		).rejects.toBeInstanceOf(ErroDeValidacao)
	})

	it("se ele aponta erro na validação da senha", async () => {
        
		repository_usuarioTeste.baseTest.push({
			id: randomUUID(),
			name: "eduardo",
			email:"eduardo@teste.com",
			password_hash: await hash("123456", 6),
			avatar: ""
		})

		await expect(
			service_autenticacaoDeUsuario.execut({
				email: "eduardo@teste.com",
				password_hash: "654321"
			})
		).rejects.toBeInstanceOf(ErroDeValidacao)
	})


	it("se a autenticação está funcionando", async () => {
        
		repository_usuarioTeste.baseTest.push({
			id: randomUUID(),
			name: "eduardo",
			email:"eduardo@teste.com",
			password_hash: await hash("123456", 6),
			avatar: ""
		})

		const {usuarioExiste} = await service_autenticacaoDeUsuario.execut({
			email: "eduardo@teste.com",
			password_hash: "123456"
		})

		expect(usuarioExiste.email).toEqual("eduardo@teste.com")
	})

})