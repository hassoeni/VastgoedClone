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