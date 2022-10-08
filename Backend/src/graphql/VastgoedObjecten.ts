import { objectType, extendType, nonNull, stringArg, intArg } from 'nexus'
import { NexusGenObjects } from '../../nexus-typegen'

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
	},
})

// links === pandendummydata
let pandendummydata: NexusGenObjects['VastgoedObj'][] = [
	{
		id: 1,
		naam: 'Laan Op Zuid 5',
		energielabel: 'B',
		marktwaarde: 100000,
		gbo: 85,
		postcode: '3156 XK',
		adress: 'Laan op Zuid 5',
		stad: 'Rotterdam',
	},
	{
		id: 2,
		naam: 'De Lampendriessen 31',
		energielabel: 'B',
		marktwaarde: 75000,
		gbo: 20,
		postcode: '5612 AH',
		adress: 'De Lampendriessen 31',
		stad: 'Eindhoven',
	},
]

// feed = vastgoedgegevens
export const VastgoedQuery = extendType({
	type: 'Query',
	definition(t) {
		t.nonNull.list.field('vastgoedgegevens', {
			type: 'VastgoedObj',
			resolve(parent, args, info, context) {
				return pandendummydata
			},
		})
	},
})

// LinkMutation = VastgoedObjMutation
// post = postpand
export const VastgoedObjMutation = extendType({
	// 1
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('post', {
			// 2
			type: 'VastgoedObj',
			args: {
				// 3
				naam: nonNull(stringArg()),
				marktwaarde: nonNull(intArg()),
				gbo: nonNull(intArg()),
				energielabel: nonNull(stringArg()),
				postcode: nonNull(stringArg()),
				adress: nonNull(stringArg()),
				stad: nonNull(stringArg()),
			},

			resolve(parent, args, context) {
				// const { description, url } = args // 4

				let idCount = pandendummydata.length + 1 // 5
				const link = {
					id: idCount,
					naam: args.naam,
					energielabel: args.energielabel,
					marktwaarde: args.marktwaarde,
					gbo: args.gbo,
					postcode: args.postcode,
					adress: args.adress,
					stad: args.stad,
				}
				pandendummydata.push(link)
				return link
			},
		})
	},
})
