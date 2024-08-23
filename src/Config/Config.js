"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const process_1 = __importDefault(require("process"));
class Config {
    mongodbConnectionString;
    constructor() {
        if (process_1.default.env.NODE_ENV === "test") {
            this.mongodbConnectionString = process_1.default.env.MONGO_URL;
        }
        else {
            this.mongodbConnectionString =
                process_1.default.env.MONGO_DB_CONNECTION_URL || "mongodb://mongodb:27017";
        }
    }
    getMongoDBConnectionString() {
        return this.mongodbConnectionString;
    }
}
exports.Config = Config;
