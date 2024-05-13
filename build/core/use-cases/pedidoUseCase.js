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
Object.defineProperty(exports, "__esModule", { value: true });
const pedido_1 = require("../../core/entities/pedido");
const pedido_2 = require("../../common/types/pedido");
class PedidoUseCase {
    static criarPedido(adicionaPedidoDTO, gateway) {
        return __awaiter(this, void 0, void 0, function* () {
            pedido_1.Pedido.validaDadosDeEntrada(adicionaPedidoDTO);
            if (!adicionaPedidoDTO.observacao) {
                adicionaPedidoDTO.observacao = '';
            }
            return yield gateway.criarPedido(adicionaPedidoDTO, pedido_2.Status.Invalido)
                .then((pedido) => __awaiter(this, void 0, void 0, function* () {
                yield PedidoUseCase.criarPagamentoPorPedido(pedido.id, gateway);
                return pedido;
            }));
        });
    }
    static criarPagamentoPorPedido(pedidoId, gateway) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!pedidoId || pedidoId == '') {
                throw new Error('O pagamento do pedido não possui um formato válido.');
            }
            return yield gateway.criarPagamentoPorPedido(pedidoId, pedido_2.StatusPagamento.CONT);
        });
    }
    static encontrarPedidoPorId(pedidoId, gateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedido = yield gateway.encontrarPedidoPorId(pedidoId);
            if (!pedido) {
                throw new Error('Pedido não encontrado.');
            }
            return pedido;
        });
    }
    static alterarStatusDoPedido(pedidoId, status, gateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const resposta = yield PedidoUseCase.encontrarPedidoPorId(pedidoId, gateway);
            if (!resposta) {
                throw new Error('Pedido não encontrado.');
            }
            const pedido = new pedido_1.Pedido({
                id: resposta.id,
                clienteId: resposta.clienteId,
                data: resposta.data,
                status: status,
                valor: resposta.valor,
                produtos: resposta.produtos.map((produto) => ({
                    produtoId: produto.produtoId,
                    produtoNome: produto.produtoNome,
                    quantidade: produto.quantidade,
                    valor: produto.valor
                }))
            });
            return yield gateway.alterarStatusDoPedido(pedido);
        });
    }
    static listarPedidos(gateway) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gateway.listarPedidos();
        });
    }
    static consultarStatusDoPagamento(pedidoId, gateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const resposta = yield PedidoUseCase.encontrarPedidoPorId(pedidoId, gateway);
            if (!resposta) {
                throw new Error('Pedido não encontrado.');
            }
            return yield gateway.consultarStatusDoPagamento(pedidoId);
        });
    }
    static alterarStatusDoPagamento(pedidoId, status, gateway) {
        return __awaiter(this, void 0, void 0, function* () {
            const resposta = yield PedidoUseCase.encontrarPedidoPorId(pedidoId, gateway);
            if (!resposta) {
                throw new Error('Pedido não encontrado.');
            }
            return yield gateway.alterarStatusDoPagamento(pedidoId, status);
        });
    }
}
exports.default = PedidoUseCase;
