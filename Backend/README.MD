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
3. 