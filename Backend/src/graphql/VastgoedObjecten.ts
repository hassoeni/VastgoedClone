import { objectType, extendType, nonNull, stringArg, intArg} from 'nexus'

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
		t.nonNull.dateTime('createdAt')
		t.nonNull.dateTime('updatedAt')
		// t.nonNull.dateTime("updatedAt")
		t.field('postedBy', {
			type: 'User',
			resolve(parent, args, context) {
				// 2
				return context.prisma.vastgoedObj
					.findUnique({ where: { id: parent.id } })
					.postedBy()
			},
		})
		t.field('elementlijst', {
			type: 'Elementen',
			resolve(parent, args, context) {
				// 2
				return context.prisma.vastgoedObj
					.findUnique({ where: { id: parent.id } })
					.elementlijst()
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

		// adds record 
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
						// verbind met element tabel
						// elementlijst: { connect: {id: parent}}
					},
				})
				return nieuwePand
			},
		})


		// delete record 
		t.field('deleteRecord', {
			type: "VastgoedObj", 
			args: {
				id: nonNull(intArg())
			},
			resolve: (_,args, context) => {
				return context.prisma.vastgoedObj.delete({
					where: {id: args.id}
				})
			}
		})

		// updates record 
		t.field('updaterecord', {
			type: "VastgoedObj", 
			args: {
				id: nonNull(intArg()),
				naam: nonNull(stringArg()),
				marktwaarde: nonNull(intArg()),
				gbo: nonNull(intArg()),
				energielabel: nonNull(stringArg()),
				postcode: nonNull(stringArg()),
				adress: nonNull(stringArg()),
				stad: nonNull(stringArg()),
			}, 
			resolve: (_,args, context) => {
				return context.prisma.vastgoedObj.update({
					where: { id: args.id },
					data: {
						naam: args.naam,
						energielabel: args.energielabel,
						marktwaarde: args.marktwaarde,
						gbo: args.gbo,
						postcode: args.postcode,
						adress: args.adress,
						stad: args.stad,
					},
				})
			}
		})

	},
})
