import { z } from "zod"
import "dotenv/config"


const PadraoDeVariaveisAmbiente = z.object({
	NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
	PORT: z.coerce.number().default(5500),
	DATABASE_URL: z.string()
})

const _env = PadraoDeVariaveisAmbiente.safeParse(process.env)

if(_env.success === false){
	console.error( _env.error.format())
	throw new Error("Erro: variavei de ambiente incopativeis")
}

export const env = _env.data