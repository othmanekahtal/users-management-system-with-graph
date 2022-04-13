"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const path_1 = require("path");
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const typesPath = (0, path_1.join)(__dirname, './resolvers/*.resolver.ts');
const typesArray = (0, load_files_1.loadFilesSync)(typesPath);
exports.resolvers = (0, merge_1.mergeResolvers)(typesArray);
//# sourceMappingURL=resolvers.js.map