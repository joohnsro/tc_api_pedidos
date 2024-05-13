import { AdicionaPedidoDTO, PedidoDTO, StatusPagamento, Status, PagamentoPorPedidoDTO } from "../../common/types/pedido";

export interface PedidoDataSourceInterface {
    criarPedido(adicionaPedidoDTO: AdicionaPedidoDTO, status: Status): Promise<string>
    encontrarPedidoPorId(pedidoId: string): Promise<PedidoDTO>
    alterarStatusDoPedido(pedidoDTO: PedidoDTO): Promise<PedidoDTO>
    listarPedidos(): Promise<PedidoDTO[]>
    consultarStatusDoPagamento(pedidoId: string): Promise<PagamentoPorPedidoDTO>
    alterarStatusDoPagamento(pedidoId: string, status: string): Promise<boolean>
    criarPagamentoPorPedido(pedidoId: string, status: StatusPagamento): Promise<boolean>
}