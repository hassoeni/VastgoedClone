import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import {schema} from './schema'
import { context } from "./context";

export const server = new ApolloServer({
	schema, // dit geeft onze schema object door aan onze server
	context, // nu kunnen we prisma overal gebruiken
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

const port = 4000

server.listen({port}).then(({url}) => {
    console.log(`🚀 GoodJob Server is ready at ${url}`)
})