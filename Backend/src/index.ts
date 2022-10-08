import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import {schema} from './schema'


export const server = new ApolloServer({
	schema, // dit geeft onze schema object door aan onze server
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

const port = 4000

server.listen({port}).then(({url}) => {
    console.log(`🚀 GoodJob Server is ready at ${url}`)
})