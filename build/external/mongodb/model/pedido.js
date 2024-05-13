"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importDefault(require("mongoose"));
const PedidoSchema = new mongoose_1.default.Schema({
    clienteId: {
        type: mongodb_1.ObjectId,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    observacao: {
        type: String,
        required: false
    },
    produtos: {
        type: Array,
        required: true
    }
});
exports.default = mongoose_1.default.model('Pedido', PedidoSchema);
