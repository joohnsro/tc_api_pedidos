import { PagamentoPorPedido } from "../../core/entities/pedido";

export class PagamentoPresenter {
    static toDTO(pagamento: PagamentoPorPedido) {
        const pagamentoDTO = {
            pedidoId: pagamento.pedidoId,
            status: pagamento.status
        }

        return {
            pedidoId: pagamentoDTO.pedidoId,
            status: pagamentoDTO.status
        }
    }

    static getStatus(pagamento: PagamentoPorPedido) {
        const pagamentoDTO = pagamento
        return {status: pagamentoDTO.status}
    }
}