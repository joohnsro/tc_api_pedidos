"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PedidoPresenter = void 0;
class PedidoPresenter {
    static toDTO(pedido) {
        const pedidoDTO = {
            id: pedido.id,
            clienteId: pedido.clienteId,
            data: pedido.data,
            observacao: pedido.observacao,
            status: pedido.status,
            valor: pedido.valor,
            produtos: pedido.produtos
        };
        return {
            id: pedidoDTO.id,
            clienteId: pedidoDTO.clienteId,
            data: pedidoDTO.data,
            observacao: pedidoDTO.observacao,
            status: pedidoDTO.status,
            valor: pedidoDTO.valor,
            produtos: pedidoDTO.produtos
        };
    }
    static toDTOList(pedidos) {
        const pedidosDTO = pedidos.map(pedido => ({
            id: pedido.id,
            clienteId: pedido.clienteId,
            data: pedido.data,
            observacao: pedido.observacao,
            status: pedido.status,
            valor: pedido.valor,
            produtos: pedido.produtos
        }));
        return pedidosDTO.map(pedido => ({
            id: pedido.id,
            clienteId: pedido.clienteId,
            data: pedido.data,
            observacao: pedido.observacao,
            status: pedido.status,
            valor: pedido.valor,
            produtos: pedido.produtos
        }));
    }
    static getId(pedido) {
        const pedidoDTO = pedido;
        return { id: pedidoDTO.id };
    }
}
exports.PedidoPresenter = PedidoPresenter;
