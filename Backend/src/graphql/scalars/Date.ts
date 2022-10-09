import { asNexusMethod } from "nexus";
import { GraphQLDateTime } from "graphql-scalars";


export const GraphQLDate = asNexusMethod(GraphQLDateTime, 'dateTime')
