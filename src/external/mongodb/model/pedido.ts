import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const PedidoSchema = new mongoose.Schema({
    clienteId: {
        type: ObjectId,
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
})

export default mongoose.model('Pedido', PedidoSchema)