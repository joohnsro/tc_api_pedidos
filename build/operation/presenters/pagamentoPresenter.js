"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagamentoPresenter = void 0;
class PagamentoPresenter {
    static toDTO(pagamento) {
        const pagamentoDTO = {
            pedidoId: pagamento.pedidoId,
            status: pagamento.status
        };
        return {
            pedidoId: pagamentoDTO.pedidoId,
            status: pagamentoDTO.status
        };
    }
    static getStatus(pagamento) {
        const pagamentoDTO = pagamento;
        return { status: pagamentoDTO.status };
    }
}
exports.PagamentoPresenter = PagamentoPresenter;
