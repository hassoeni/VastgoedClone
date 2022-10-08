import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
	const nieuwePand = await prisma.vastgoedObj.create({
		data: {
			naam: 'Dummy naam 1',
			marktwaarde: 10000,
			gbo: 50,
			energielabel: 'B',
			postcode: '6566AL',
			adress: 'Dummy adress',
			stad: 'New York',
		},
	})

	const allPanden = await prisma.vastgoedObj.findMany()
	console.log(allPanden)
}

main()
	.catch((e) => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
