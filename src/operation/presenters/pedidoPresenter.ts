import { Pedido } from "../../core/entities/pedido";

export class PedidoPresenter {
    static toDTO(pedido: Pedido) {
        const pedidoDTO = {
            id: pedido.id,
            clienteId: pedido.clienteId,
            data: pedido.data,
            observacao: pedido.observacao,
            status: pedido.status,
            valor: pedido.valor,
            produtos: pedido.produtos
        }

        return {
            id: pedidoDTO.id,
            clienteId: pedidoDTO.clienteId,
            data: pedidoDTO.data,
            observacao: pedidoDTO.observacao,
            status: pedidoDTO.status,
            valor: pedidoDTO.valor,
            produtos: pedidoDTO.produtos
        }
    }

    static toDTOList(pedidos: Pedido[]) {
        const pedidosDTO = pedidos.map(pedido => ({
            id: pedido.id,
            clienteId: pedido.clienteId,
            data: pedido.data,
            observacao: pedido.observacao,
            status: pedido.status,
            valor: pedido.valor,
            produtos: pedido.produtos
        }))

        return pedidosDTO.map(pedido => ({
            id: pedido.id,
            clienteId: pedido.clienteId,
            data: pedido.data,
            observacao: pedido.observacao,
            status: pedido.status,
            valor: pedido.valor,
            produtos: pedido.produtos
        }))
    }

    static getId(pedido: Pedido) {
        const pedidoDTO = pedido
        return {id: pedidoDTO.id}
    }
}