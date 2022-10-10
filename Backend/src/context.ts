import { Prisma, PrismaClient } from '@prisma/client'
import { decodeAuthHeader, AuthTokenPayload } from '../utils/auth'
import { Request } from 'express' 
import { Elementen } from './graphql'

export interface Context {
	prisma: PrismaClient
	userId?: number
}

const prisma = new PrismaClient()

export const context = ({ req }: { req: Request }): Context => {
	// 2
	const token =
		req && req.headers.authorization
			? decodeAuthHeader(req.headers.authorization)
			: null

	return {
		prisma,
		userId: token?.userId,
	}
}
