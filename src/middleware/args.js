import minimist from "minimist";
import dotenv from "dotenv";
dotenv.config();
const args = minimist(process.argv.slice(2));

export const Argumentos = args;
export const portArg = args.puerto || 8080;
