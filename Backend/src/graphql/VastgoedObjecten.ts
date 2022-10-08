import { objectType, extendType, nonNull, stringArg, intArg } from 'nexus'
import { NexusGenObjects } from '../../nexus-typegen'
import { Context } from '../context'

// LINK = VastgoedObj
export const VastgoedObj = objectType({
	name: 'VastgoedObj',
	definition(t) {
		t.nonNull.int('id')
		t.nonNull.string('naam')
		t.nonNull.string('energielabel')
		t.nonNull.int('marktwaarde')
		t.nonNull.int('gbo')
		t.nonNull.string('postcode')
		t.nonNull.string('adress')
		t.nonNull.string('stad')
		t.field('postedBy', {
			type: 'User',
			resolve(parent, args, context) {
				// 2
				return context.prisma.vastgoedObj
					.findUnique({ where: { id: parent.id } })
					.postedBy()
			},
		})
	},
})

// feed = vastgoedgegevens
export const VastgoedQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.list.field('vastgoedgegevens', {
			type: 'VastgoedObj',
			resolve(parent, args, context) {
				return context.prisma.vastgoedObj.findMany()
			},
		})
	},
})

// LinkMutation = VastgoedObjMutation
// post = postpand
export const VastgoedObjMutation = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('postpand', {
			type: 'VastgoedObj',
			args: {
				naam: nonNull(stringArg()),
				marktwaarde: nonNull(intArg()),
				gbo: nonNull(intArg()),
				energielabel: nonNull(stringArg()),
				postcode: nonNull(stringArg()),
				adress: nonNull(stringArg()),
				stad: nonNull(stringArg()),
			},

			resolve(parent, args, context) {
				const { userId } = context
				if (!userId) {
					// 1
					throw new Error('Cannot post without logging in.')
				}
				const nieuwePand = context.prisma.vastgoedObj.create({
					data: {
						naam: args.naam,
						energielabel: args.energielabel,
						marktwaarde: args.marktwaarde,
						gbo: args.gbo,
						postcode: args.postcode,
						adress: args.adress,
						stad: args.stad,
						postedBy: { connect: { id: userId } },
					},
				})
				return nieuwePand
			},
		})
	},
})
