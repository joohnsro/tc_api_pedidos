import { PedidoGatewayInterface } from "../../../common/interfaces/gateways";
import { PedidoDataSourceInterface } from "../../../common/interfaces/datasource";
import { AdicionaPedidoDTO, PedidoDTO, Status, StatusPagamento } from "../../../common/types/pedido";
import { PagamentoPorPedido, Pedido } from "../../../core/entities/pedido";

export default class MongoDBPedidoGateway implements PedidoGatewayInterface {

    private readonly dataSource: PedidoDataSourceInterface;

    constructor(dataSource: PedidoDataSourceInterface) {
        this.dataSource = dataSource
    }

    async criarPedido(adicionaPedidoDTO: AdicionaPedidoDTO, status: Status): Promise<Pedido> {
        const pedidoId = await this.dataSource.criarPedido(adicionaPedidoDTO, status)
        return new Pedido({
            id: pedidoId,
            clienteId: adicionaPedidoDTO.clienteId,
            data: adicionaPedidoDTO.data,
            observacao: adicionaPedidoDTO.observacao,
            status: status,
            valor: adicionaPedidoDTO.valor,
            produtos: adicionaPedidoDTO.produtos
        })
    }
    
    async encontrarPedidoPorId(pedidoId: string): Promise<Pedido | null> {
        const resposta = await this.dataSource.encontrarPedidoPorId(pedidoId)

        if ( resposta === null || resposta === undefined ) {
            return null
        }

        return new Pedido(resposta)
    }

    async alterarStatusDoPedido(pedidoDTO: PedidoDTO): Promise<Pedido> {
        const pedidoDataSource = await this.dataSource.alterarStatusDoPedido(pedidoDTO)
        return new Pedido(pedidoDataSource)
    }

    async listarPedidos(): Promise<Pedido[] | null> {
        const pedidosDatasource = await this.dataSource.listarPedidos()
        
        if ( ! pedidosDatasource || pedidosDatasource.length === 0 ) {
            return null
        }

        return pedidosDatasource.map(pedidoDTO => {
            return new Pedido(pedidoDTO)
        })
    }
    
    async consultarStatusDoPagamento(pedidoId: string): Promise<PagamentoPorPedido> {
        const pagamentoPorpedidoDTO = await this.dataSource.consultarStatusDoPagamento(pedidoId)
        return new PagamentoPorPedido(pagamentoPorpedidoDTO)
    }

    async alterarStatusDoPagamento(pedidoId: string, status: string): Promise<PagamentoPorPedido> {
        await this.dataSource.alterarStatusDoPagamento(pedidoId, status)
        return new PagamentoPorPedido({
            pedidoId, status: StatusPagamento[status as keyof typeof StatusPagamento]
        })
    }

    async criarPagamentoPorPedido(pedidoId: string, status: StatusPagamento): Promise<PagamentoPorPedido> {
        return await this.dataSource.criarPagamentoPorPedido(pedidoId, status)
            .then(() => new PagamentoPorPedido({
                pedidoId, status
            }))
    }
}