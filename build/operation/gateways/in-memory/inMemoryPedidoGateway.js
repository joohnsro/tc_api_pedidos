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
const pedido_1 = require("../../../common/types/pedido");
const pedido_2 = require("../../../core/entities/pedido");
class InMemoryPedidoGateway {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    criarPedido(adicionaPedidoDTO, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidoId = yield this.dataSource.criarPedido(adicionaPedidoDTO, status);
            return new pedido_2.Pedido({
                id: pedidoId,
                clienteId: adicionaPedidoDTO.clienteId,
                data: adicionaPedidoDTO.data,
                observacao: adicionaPedidoDTO.observacao,
                status: pedido_1.Status.Invalido,
                valor: adicionaPedidoDTO.valor,
                produtos: adicionaPedidoDTO.produtos
            });
        });
    }
    encontrarPedidoPorId(pedidoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const resposta = yield this.dataSource.encontrarPedidoPorId(pedidoId);
            if (resposta === null || resposta === undefined) {
                return null;
            }
            return new pedido_2.Pedido(resposta);
        });
    }
    alterarStatusDoPedido(pedidoDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidoDataSource = yield this.dataSource.alterarStatusDoPedido(pedidoDTO);
            return new pedido_2.Pedido(pedidoDataSource);
        });
    }
    listarPedidos() {
        return __awaiter(this, void 0, void 0, function* () {
            const pedidosDatasource = yield this.dataSource.listarPedidos();
            if (!pedidosDatasource) {
                return null;
            }
            return pedidosDatasource.map(pedidoDTO => {
                return new pedido_2.Pedido(pedidoDTO);
            });
        });
    }
    consultarStatusDoPagamento(pedidoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pagamentoPorpedidoDTO = yield this.dataSource.consultarStatusDoPagamento(pedidoId);
            return new pedido_2.PagamentoPorPedido(pagamentoPorpedidoDTO);
        });
    }
    alterarStatusDoPagamento(pedidoId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dataSource.alterarStatusDoPagamento(pedidoId, status);
            return new pedido_2.PagamentoPorPedido({
                pedidoId, status
            });
        });
    }
    criarPagamentoPorPedido(pedidoId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dataSource.criarPagamentoPorPedido(pedidoId, status);
            return new pedido_2.PagamentoPorPedido({
                pedidoId, status
            });
        });
    }
}
exports.default = InMemoryPedidoGateway;
