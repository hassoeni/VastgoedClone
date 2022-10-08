<STAPPENPLAN>
1. begin met npm init -y dan npm i --save-dev typescript ts-node-dev apollo-server graphql nexus en touch tsconfig.json
2. plak de typescript config contents: 
    {
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "lib": [
      "esnext"
    ],
    "strict": true,
    "rootDir": ".",
    "outDir": "dist",
    "sourceMap": true,
    "esModuleInterop": true
  }
}
3. mkdir src + touch src/schema.ts en src/index.ts 
4. boilerplate code: import {makeSchema} from 'nexus' en import {join} from 'path' export const schema= makeSchema({types:[], outputs:  {schema: join(process.cwd(), "schema.graphql), typegen: join(process.cwd(), "nexus-typegen.ts")}})
5. npx ts-node --transpile-only src/schema om bestanden te genereren. 
6. pas je scripts aan met     "dev": "ts-node-dev --transpile-only --no-notify --exit-child src/index.ts", en     "generate": "ts-node --transpile-only src/schema.ts" 
7. maak een folder genaamd graphql en plaats 2 bestanden VastgoedObjecten en index hierin
8. defineer je vastgoed Graphql object. importeer eerst objectType van nexus vervolgens zeg je export const VastgoedObj = objectType({ name:"VastgoedObj", definition(t) {en dan all die t.something.datatype("name")}})
9. pas je index.ts in je graphql folder aan met export * from './VastgoedObjecten' + ga naar je schema.ts en verwijder types: [] voor types, en importeer * as types van de index.ts uit je graphql folder.

<Vastgoed type naar Querien>
1. importeer extendType, en objectType van nexus en importeer NexusGenObjects van nexus-typegen 
2. definieer een variabel met let variabel: NexusGenObjects["VastgoedObj"][] = [
  {
    datatype id : 1
    datatype naam 2: dummy data 
    datatype naam 3: dummy data 
    datatype naam 4: dummy data 
  },   {
    id : 2
    datatype naam 2: dummy data 
    datatype naam 3: dummy data 
    datatype naam 4: dummy data 
  }, 
]
dit vult je VastgoedObj met data 
3. definieer een VastgoedQuery met export const en extendType({type: "Query", definition(t){t.nonNull.list.field("naam van je extendedtype", {type:"wat extend je in dit geval VastgoedObj",, resolve(parent,args,context,info) return variabel die je hierboven hebt gedefinieerd})}})

<Mutation in VastgoedObj>
1. importeer eerst nonNull en stringArg uit nexus 
2. defineer een export const VastgoedObjMutation = extendtype({type: "Mutation", defination(t) {
  t.nonNull.field("naam van je mutatie", {
    type: "naam van je object dat je wilt extenden dus VastgoedObj", 
    args: {
      naam: nonNull(stringArg()), 
      energielabel:nonNull(stringArg()) , 
      marktwaarde: nonNull(intArg()), 
      gbo: nonNull(intArg()),
      postcode etc,
      adress etc,
      stad etc
    }, 

    resolve (parent,args,context) {
      const {desctructure all je bovenstaande variabelen} = args

      let idCount = pandendummydata.length + 1 
      const enkelpand = {
        id: idCount,
        alle andere variabelen : alle andere variabelen
      }
      pandendummydata.push(enkelpand) return enkelpand    }
  })
}})
3. test dit uit in je playground 

<Prisma>
1. installeer prisma en maak een Vastgoedobj model 
2. maak een script.ts bestand in je src. Initializeer prisma client hier en maak een async main function en call je main function ook. 
async function main() {
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
3. run npx ts-node src/script.ts dit zal een empty object initialiseren 
4. nu gaan we onze database van data voorzien.  maak een nieuwe variabel aan boven const allPanden genaam const nieuwPand  = await prisma.vastgoedobj.create({data: {naam: "dummy naam", stad: "stadsnaam" etc... }})
5. maak een context.ts bestand aan. en importeer ook hier prisma client. Maak een nieuwe interface die je exporteert genaamd Context en stop hier prisma: PrismaClient  
6. vervolgens exporteer je een variabel genaamd context waar je je Context in called met : en stop je ook hier prisma 
7. tot slot voeg contextType toe aan schema.ts en zeg hier export: "Context" en module: join(process.cwd(), "./src/context.ts")
en voeg het ook toe aan ApolloServer in index.ts met import {context} from "./Context" en dan onder export const server voeg je context toe 
8. nu kan je prisma.alljeprismatabellen.alljeprismafuncties overal gebruiken vergeet niet bij context: Context te roepen in je queries en natuurlijk te importere n

<Gebruikers toevoegen>
1. Maak een gebruiker schema aan in prisma en verbind deze met je vastgoedobj 
2. 