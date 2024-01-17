import { describe, it, expect, beforeEach } from "vitest"
import { UsuarioTeste } from "@/repository/local-de-teste/usuario"
import { CriarUsuario } from "."
import bcrypt from "bcryptjs"
import { EmailExistente } from "@/erros/emailExistente"

let repository_prisma: UsuarioTeste
let service_criarUsuario: CriarUsuario

describe("Criação de usuarios", () => {

	beforeEach(() => {
		repository_prisma = new UsuarioTeste()
		service_criarUsuario = new CriarUsuario(repository_prisma)
	})

	it("é possivel criar um usuário", async () => {
		
		const {user} = await service_criarUsuario.execut({
			name: "eduardo",
			email:"eduardo@teste.com",
			password: "123456",
		})

		expect(user.name).toEqual("eduardo")
	})

	it("existe um email já cadastrado", async() => {

		await service_criarUsuario.execut({
			name: "eduardo",
			email:"eduardo@teste.com",
			password: "123456",
		})

		expect(service_criarUsuario.execut(
			{
				name: "eduardo",
				email:"eduardo@teste.com",
				password: "123456",
			})
		).rejects.toBeInstanceOf(EmailExistente)
	})

	it("a senha está criptografada", async () => {

		const {user} = await service_criarUsuario.execut({
			name: "eduardo",
			email:"eduardo@teste.com",
			password: "123456",
		})

		const senhaEstaCriptografada = await bcrypt.compare("123456", user.password_hash)

		expect(senhaEstaCriptografada).toBe(true)
	})
})