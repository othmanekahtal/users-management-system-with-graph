"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const path_1 = require("path");
const load_files_1 = require("@graphql-tools/load-files");
const merge_1 = require("@graphql-tools/merge");
const typesPath = (0, path_1.join)(__dirname, './types/*.type.*');
console.log(typesPath);
const typesArray = (0, load_files_1.loadFilesSync)(typesPath);
exports.typeDefs = (0, merge_1.mergeTypeDefs)(typesArray);
//# sourceMappingURL=typeDefs.js.map