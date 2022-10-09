import { objectType, extendType, nonNull, stringArg } from 'nexus'
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { APP_SECRET } from '../../utils/auth'
import { Context } from '../context'

// defines authpayload
export const AuthPayload = objectType({
	name: 'AuthPayload',
	definition(t) {
		t.nonNull.string('token')
		t.nonNull.field('user', {
			type: 'User',
		})
	},
})

export const AuthMutation = extendType({
	type: 'Mutation',
	definition(t) {

		// handle sign in 
		t.nonNull.field('login', {
			type: 'AuthPayload',
			args: {
				email: nonNull(stringArg()),
				password: nonNull(stringArg()),
			},
			async resolve(parent, args, context) {
				// 1 query database for user 
				const user = await context.prisma.user.findUnique({
					where: { email: args.email },
				})
				if (!user) {
					throw new Error('No such user found')
				}

				// 2 if there is a user check password
				const valid = await bcrypt.compare(args.password, user.password)
				if (!valid) {
					throw new Error('Invalid password')
				}

				// 3 if there is a password sign in user with jwt 
				const token = jwt.sign({ userId: user.id }, APP_SECRET)

				// 4 return token and user as object
				return {
					token,
					user,
				}
			},
		})

		// handle signup 
		t.nonNull.field('signup', {
			type: 'AuthPayload',
			args: {
				email: nonNull(stringArg()),
				password: nonNull(stringArg()),
				name: nonNull(stringArg()),
			},
			async resolve(parent, args, context) {
				const { email, name } = args

				// take user password and hash it 
				const password = await bcrypt.hash(args.password, 10)

				// make a user object with email, name and password
				const user = await context.prisma.user.create({
					data: { email, name, password },
				})

				// grant this user a unique token
				const token = jwt.sign({ userId: user.id }, APP_SECRET)

				return {
					token,
					user,
				}
			},
		})
	},
})