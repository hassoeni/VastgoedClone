// LINK = VastgoedObj 
import {objectType} from 'nexus'

export const VastgoedObj = objectType({
    name: "VastgoedObj",
    definition(t) {
        t.nonNull.int("id")
        t.nonNull.string("naam")
        t.nonNull.string("energielabel")
        t.nonNull.int("marktwaarde")
        t.nonNull.int("gbo")
        t.nonNull.string("postcode")
        t.nonNull.string("adress")
    },
})