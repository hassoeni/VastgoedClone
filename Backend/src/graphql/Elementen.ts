import { extendType, floatArg, intArg, nonNull, objectType, stringArg } from 'nexus'
import { Context } from '../context'

// objecten = panden
export const Elementen = objectType({
	name: 'Elementen',
	definition(t) {
		t.nonNull.int('id')
		t.nonNull.string('hoofdelementnaam')
		t.nonNull.string('omschrijving')
		t.nonNull.int('hecode')
        t.nonNull.float('heprijspereenheid')
        t.nonNull.string('eenheidtype')
		t.nonNull.list.nonNull.field('elementGegevens', {
			type: 'VastgoedObj',
			resolve(parent, args, context) {
				return context.prisma.elementen
					.findUnique({ where: { id: parent.id } })
					.objecten()
			},
		})
	},
})

export const ElementMutation = extendType({
	type: "Mutation", 
	definition(t) {
		
		t.nonNull.field('voegelementtoe', {
			type: 'Elementen',
			args: {
				hoofdelementnaam: nonNull(stringArg()),
				hecode: nonNull(intArg()),
				heprijspereenheid: nonNull(floatArg()),
				omschrijving: nonNull(stringArg()),
				eenheidtype: nonNull(stringArg()),
			},
			resolve(parent,args, context) {
				const {userId} = context
				if(!userId) {
					throw new Error('Je moet ingelogd zijn om een element aan te maken')
				}
				const  nieuweElement = context.prisma.elementen.create({
					data: {
						hoofdelementnaam: args.hoofdelementnaam,
						hecode: args.hecode,
						heprijspereenheid: args.heprijspereenheid,
						omschrijving: args.omschrijving,
						eenheidtype: args.eenheidtype
					}
				})
				return nieuweElement
			}
		})
	},
})

