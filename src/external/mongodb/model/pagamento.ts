import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const PagamentoSchema = new mongoose.Schema({
    pedidoId: {
        type: ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true
    },
})

export default mongoose.model('Pagamento', PagamentoSchema)