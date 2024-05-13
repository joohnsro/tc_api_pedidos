"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = () => {
    mongoose_1.default.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongo:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`);
    const db = mongoose_1.default.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    return db;
};
