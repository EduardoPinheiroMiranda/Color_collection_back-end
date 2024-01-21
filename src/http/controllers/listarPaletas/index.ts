import { FastifyRequest, FastifyReply } from "fastify"

//eslint-disable-next-line
export async function listarPaletas(request: FastifyRequest, reply: FastifyReply){

//categoria deve ter opções no zod{personalizada, triade, analoga, ...} e
// caso não seja dito na requisição qual o tipo da categoria retorne all como padrão
}