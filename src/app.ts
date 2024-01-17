import fastify from "fastify"

import { routers } from "./http/routes"

export const app = fastify()

app.register(routers)