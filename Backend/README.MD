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
1. Maak een gebruiker schema aan in prisma en verbind deze met je vastgoedobj doe dit door een postedById Int? toe te voegen aan VastgoedObj en PostedBy te verbinden met @relation fields postedbyid - references id 
2. Gebruiker schema heeft een toevoeging panden dit is VastgoedObj[] lijst met objecten dus die door de gebruiker zijn gemaakt. 
3. installeer jwt, bcrypt en hun @types 
4. onder src/graphql maak een User bestand aan hierin importeer je objectType en maak je een export const User objectType 
5. je doet je boilerplate nexus dingen t.nonNull en dan alles van je schema als laatste heb je een t.nonnull.list.nonnull.field(gebruikerdata, {type: onze primaire Vastgoedobj, resolve parent,args,context en dan return je prisma.findunique where id: parent.id}).panden() dus ook alle panden onder deze gebruiker 
6. maak een bestand Auth.ts aan om je signup en login te handelen 
<Signup / Login >

1.importeer objectType, extendType, nonNull en stringArg van nexus ook
2. importeer je * van bcrypt en jwt en importeer je APP_SECRET van utils/auth
3. maak een AuthPayload object type deze bestaat uit een t.nonnull string token en fiel user, of type User 
4. export const authmutation = extendType hier maak je een mutation type 
deze krijgt meteen een nonnull field login die type: authpayload uitbreid met args email en password. async reslove dit type. check met findUnque where email matches args email of er een gebruiker is . als er geen gebruiker is moet je een error returneren. als er wel een gebruiker is maak een valid variabel aan en await bycrypt.compare waar de password van het argument gematched wordt met de gebruiker wachtwoord. als dit niet oke is gooi error anders maak een token variabel aan en gebruik jwt.sign({userId: user.id}, APP_SECRET) en return token,user  
5. het zelfde voor signup field alleen breid je args uit met name, 
ook weer een async resolve en ga je eerst een password variabel aanmaken en await je bycrypt om dit te hashen met 10 
5a. vervolgens maak je een gebruiker variabel aan en await je ook hier prisma.create en geef je data als argument door met email,naam en wachtwoord. 
5b. maak ook een token variabel aan en gebruik je jwt.sign({userId, user.id}, APP_SECRET)
6. return token en user 

<utils and CONTEXT>
in utils improteer alles als jwt van jsonwebtoken 
1. exporteer een nieuwe variabel hier genaam APP_SECRET  = verzin een string 
2. exporteer een interface genaamd AuthTokenPayload {userId: number} 
3. exporteer een functie decodeAuthHeader(authHeader:String): AuthTokenPayload  {weer je token variabel = authHeader.replace('Bearer ', '') en als er geen token is gooi error geen token gevonden ander return jwt.verify(token, APP_SECRET) as AuthTokenPayload}

4. je wilt alles doorgeven aan context om overal te gebruiken in je context interface zeg je userId?: number , en pas je je context variabel aan naar 
4a. export const context = ({req}: {req: Request}): Context => {
  const token = req && req.headers.authorization ? decodeAuthHeader(req.headers.authorization) : null return prisma en userId: token?.userId
}

<VastgoedObj>
voeg onder je vastgoedObj objectType de .postedBy() nog toe. om alles te verbinden met elkaar. 

2. pas ook je create mutation aan. onder je resolve destructure userId van je context. 
2a. als er geen userid is gooi een error dat je eerst moet inloggen om te posten 
2b. onder je nieuwePand variabel voeg nog postedBy: {connect: {id: userId}}  toe 


1. defineer een custom scalar voor datetime doe dit door een folder scaler te maken en een file Date.ts 
1a. importeer asNexusMethod van nexus en GraphQLDateTime van graphql-scalars installeer ook deze package 
1b. export const GraphQLDate = as nexusMethod(GraphqLDatetime, 'dateTime')

2. onder je objecttype voeg nu t.nonNull.dateTime('createdAt') en ook een voor updatedAt toe. 


<UPDATE EN DELETE ITEMS >
1. maak een nieuwe t.field aan en noem deze deleterecord dit is een extensie van vastgoedObj en krijgt als argument alleen de id mee 
resolve dit door prisma.delete te roepen waar de id: args.id matched 
2. voor update record doe je het zelfde alleen haal je hier alle records op onder args. 
bij je resolve doe je nu prisma.update waar id de args id matched en als data geef je alle nieuwep args.items mee 