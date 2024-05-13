"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pedido_1 = require("../../common/types/pedido");
const pedido_2 = __importDefault(require("./model/pedido"));
const pagamento_1 = __importDefault(require("./model/pagamento"));
const mongodb_1 = require("mongodb");
class MongoDBPedido {
    criarPedido(pedido, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const { clienteId, data, valor, observacao, produtos } = pedido;
            const novoPedido = new pedido_2.default({
                clienteId, data, valor, observacao, produtos, status
            });
            return yield novoPedido.save()
                .then(({ _id }) => String(_id));
        });
    }
    encontrarPedidoPorId(pedidoId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pedido_2.default.findById(pedidoId)
                .exec()
                .then((pedidoEncontrado) => {
                if (!(pedidoEncontrado === null || pedidoEncontrado === void 0 ? void 0 : pedidoEncontrado._id)) {
                    return null;
                }
                let produtos = [];
                if (pedidoEncontrado.produtos && pedidoEncontrado.produtos.length > 0) {
                    pedidoEncontrado.produtos.forEach((produto) => {
                        const produtoPorPedidoDTO = {
                            produtoId: produto.produtoId,
                            produtoNome: produto.produtoNome,
                            quantidade: produto.quantidade,
                            valor: produto.valor
                        };
                        produtos.push(produtoPorPedidoDTO);
                    });
                }
                const pedido = {
                    id: String(pedidoEncontrado._id),
                    clienteId: String(pedidoEncontrado.clienteId),
                    data: pedidoEncontrado.data,
                    status: pedidoEncontrado.status,
                    valor: pedidoEncontrado.valor,
                    observacao: pedidoEncontrado.observacao,
                    produtos,
                };
                return pedido;
            })
                .catch(err => err);
        });
    }
    alterarStatusDoPedido(pedidoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidoObjectId = new mongodb_1.ObjectId(pedidoDTO.id);
            return yield pedido_2.default.findByIdAndUpdate(pedidoObjectId, {
                status: pedidoDTO.status
            })
                .exec()
                .then(() => pedidoDTO)
                .catch(err => err);
        });
    }
    listarPedidos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pedido_2.default.find({ status: { $gt: 0, $lt: 4 } }).sort({ status: -1, data: 1 })
                .exec()
                .then(pedidosEncontrados => {
                const pedidos = [];
                pedidosEncontrados.forEach((pedidoEncontrado) => {
                    let produtos = [];
                    if (pedidoEncontrado.produtos && pedidoEncontrado.produtos.length > 0) {
                        pedidoEncontrado.produtos.forEach((produto) => {
                            const produtoPorPedidoDTO = {
                                produtoId: produto.produtoId,
                                produtoNome: produto.produtoNome,
                                quantidade: produto.quantidade,
                                valor: produto.valor
                            };
                            produtos.push(produtoPorPedidoDTO);
                        });
                    }
                    const pedido = {
                        id: String(pedidoEncontrado._id),
                        clienteId: String(pedidoEncontrado.clienteId),
                        data: pedidoEncontrado.data,
                        status: pedidoEncontrado.status,
                        valor: pedidoEncontrado.valor,
                        observacao: pedidoEncontrado.observacao,
                        produtos,
                    };
                    pedidos.push(pedido);
                });
                return pedidos;
            })
                .catch(err => err);
        });
    }
    consultarStatusDoPagamento(pedidoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidoObjectId = new mongodb_1.ObjectId(pedidoId);
            return yield pagamento_1.default.findOne({ pedidoId: pedidoObjectId })
                .exec()
                .then((pagamentoEncontrado) => {
                if (!(pagamentoEncontrado === null || pagamentoEncontrado === void 0 ? void 0 : pagamentoEncontrado._id)) {
                    return null;
                }
                const pagamento = {
                    pedidoId: pedidoId,
                    status: pedido_1.StatusPagamento[pagamentoEncontrado.status]
                };
                return pagamento;
            })
                .catch(err => err);
        });
    }
    alterarStatusDoPagamento(pedidoId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidoObjectId = new mongodb_1.ObjectId(pedidoId);
            return yield pagamento_1.default.findOneAndUpdate({ pedidoId: pedidoObjectId }, { status: status })
                .exec()
                .then(() => true)
                .catch(err => err);
        });
    }
    criarPagamentoPorPedido(pedidoId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidoObjectId = new mongodb_1.ObjectId(pedidoId);
            const novoPagamento = new pagamento_1.default({
                pedidoId: pedidoObjectId, status
            });
            return yield novoPagamento.save()
                .then(({ _id }) => true);
        });
    }
}
exports.default = MongoDBPedido;
