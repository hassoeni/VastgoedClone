import { objectType } from 'nexus'
import { Context } from '../context'

// panden = links
export const User = objectType({
	name: 'User',
	definition(t) {
		t.nonNull.int('id')
		t.nonNull.string('name')
		t.nonNull.string('email')
        t.nonNull.list.nonNull.field("gebruikerData", {
            type: "VastgoedObj", 
            resolve(parent, args, context) {
                return context.prisma.user.findUnique({where: {id: parent.id}}).panden()
            }
        })
	},
})
