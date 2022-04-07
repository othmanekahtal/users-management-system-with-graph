import {join} from 'path'
import {loadFilesSync} from '@graphql-tools/load-files'
import {mergeResolvers} from '@graphql-tools/merge'

const typesPath = join(__dirname, './resolvers/*.resolver.ts')

const typesArray = loadFilesSync(typesPath)

export const resolvers = mergeResolvers(typesArray)
