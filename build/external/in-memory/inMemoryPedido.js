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
class InMemoryPedido {
    constructor() {
        this.pedidos = [
            { id: '1', clienteId: '1', data: '2023-12-28 19:00:00', status: pedido_2.Status.Recebido, valor: 60.8, produtos: [{ produtoId: '1', produtoNome: 'X-Burguer', quantidade: 2, valor: 11.80 }, { produtoId: '2', produtoNome: 'Coca-Cola', quantidade: 2, valor: 11.80 }] },
            { id: '2', clienteId: '2', data: '2023-12-28 19:40:00', status: pedido_2.Status.EmPreparacao, valor: 30.4, produtos: [{ produtoNome: 'X-Burguer', produtoId: '1', quantidade: 1, valor: 5.90 }] },
        ];
        this.pagamentoPorPedido = [
            { pedidoId: '1', status: pedido_2.StatusPagamento.APRO },
            { pedidoId: '2', status: pedido_2.StatusPagamento.APRO },
            { pedidoId: '3', status: pedido_2.StatusPagamento.CALL },
        ];
    }
    criarPedido(adicionaPedidoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const tempPedidos = [...this.pedidos];
            if (tempPedidos.length > 1) {
                tempPedidos.sort((a, b) => {
                    if (a.id && b.id) {
                        return parseInt(a.id) - parseInt(b.id);
                    }
                    else {
                        return false;
                    }
                });
                tempPedidos.reverse();
            }
            let ultimoId = tempPedidos[0] ? String(tempPedidos[0].id) : String(0);
            let pedidoId = ultimoId ? String(parseInt(ultimoId) + 1) : String(1);
            const pedido = new pedido_1.Pedido(Object.assign({ id: pedidoId, status: pedido_2.Status.Invalido }, adicionaPedidoDTO));
            this.pedidos.push(pedido);
            return pedidoId;
        });
    }
    encontrarPedidoPorId(pedidoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const posicaoPedido = this.pedidos.map(item => item.id).indexOf(pedidoId);
            if (posicaoPedido === -1) {
                throw new Error('Pedido não encontrado.');
            }
            const pedido = Object.assign({}, this.pedidos[posicaoPedido]);
            return pedido;
        });
    }
    alterarStatusDoPedido(pedidoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            this.pedidos.forEach(item => {
                if (item.id === pedidoDTO.id) {
                    item.status = pedidoDTO.status;
                }
            });
            return this.pedidos.filter(item => item.id === pedidoDTO.id)[0];
        });
    }
    listarPedidos() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pedidos;
        });
    }
    consultarStatusDoPagamento(pedidoId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pagamentoPorPedido.filter(pagamento => pagamento.pedidoId === pedidoId)[0];
        });
    }
    alterarStatusDoPagamento(pedidoId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            this.pagamentoPorPedido.forEach(pagamento => {
                if (pagamento.pedidoId == pedidoId) {
                    pagamento.status = status;
                }
            });
            return true;
        });
    }
    criarPagamentoPorPedido(pedidoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagamento = { pedidoId, status: pedido_2.StatusPagamento.CONT };
            this.pagamentoPorPedido.push(pagamento);
            return true;
        });
    }
}
exports.default = InMemoryPedido;
