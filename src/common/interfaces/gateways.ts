import { AdicionaPedidoDTO, PedidoDTO, Status, StatusPagamento } from "../../common/types/pedido";
import { PagamentoPorPedido, Pedido } from "../../core/entities/pedido";

export interface PedidoGatewayInterface {
    criarPedido(adicionaPedidoDTO: AdicionaPedidoDTO, status: Status): Promise<Pedido>
    encontrarPedidoPorId(pedidoId: string): Promise<Pedido | null>
    alterarStatusDoPedido(pedidoDTO: PedidoDTO): Promise<Pedido>
    listarPedidos(): Promise<Pedido[] | null>
    consultarStatusDoPagamento(pedidoId: string): Promise<PagamentoPorPedido>
    alterarStatusDoPagamento(pedidoId: string, status: string): Promise<PagamentoPorPedido>
    criarPagamentoPorPedido(pedidoId: string, status: StatusPagamento): Promise<PagamentoPorPedido>
}