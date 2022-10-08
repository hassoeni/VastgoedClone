import {makeSchema} from 'nexus'
import {join} from 'path' 

export const schema = makeSchema({
    types: [],
    outputs: {
        schema: join(process.cwd(), "schema.graphql"), // Notities: genereert een GraphQl Schema. 
        typegen: join(process.cwd(), "nexus-typegen.ts") // Notities: genereert een typescript typegen bestand voor de graphql schema 
    }
})