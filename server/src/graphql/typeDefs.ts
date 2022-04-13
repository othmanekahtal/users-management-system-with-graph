import {join} from 'path'
import {loadFilesSync} from '@graphql-tools/load-files'
import {mergeTypeDefs} from '@graphql-tools/merge'

const typesPath = join(__dirname, './types/*.type.*')
console.log(typesPath)

const typesArray = loadFilesSync(typesPath)

export const typeDefs = mergeTypeDefs(typesArray)
