import { Pedido } from "../../core/entities/pedido";
import { PedidoDataSourceInterface } from "../../common/interfaces/datasource";
import { AdicionaPedidoDTO, PagamentoPorPedidoDTO, PedidoDTO, ProdutoPorPedidoDTO, Status, StatusPagamento } from "../../common/types/pedido";

export default class InMemoryPedido implements PedidoDataSourceInterface {
    
    private pedidos: PedidoDTO[] = [
        { id: '1', clienteId: '1', data: '2023-12-28 19:00:00', status: Status.Recebido, valor: 60.8, produtos: [{ produtoId: '1', produtoNome: 'X-Burguer', quantidade: 2, valor: 11.80 }, { produtoId: '2', produtoNome: 'Coca-Cola', quantidade: 2, valor: 11.80 }] },
        { id: '2', clienteId: '2', data: '2023-12-28 19:40:00', status: Status.EmPreparacao, valor: 30.4, produtos: [{ produtoNome: 'X-Burguer', produtoId: '1', quantidade: 1, valor: 5.90 }] },
    ] 

    private pagamentoPorPedido: any[] = [
        { pedidoId: '1', status: StatusPagamento.APRO },
        { pedidoId: '2', status: StatusPagamento.APRO },
        { pedidoId: '3', status: StatusPagamento.CALL },
    ]

    async criarPedido(adicionaPedidoDTO: AdicionaPedidoDTO): Promise<string> {
        const tempPedidos: PedidoDTO[] = [...this.pedidos]
        if ( tempPedidos.length > 1 ) {
            tempPedidos.sort((a: PedidoDTO, b: PedidoDTO): any => {
                if ( a.id && b.id ) {
                    return parseInt(a.id) - parseInt(b.id)
                } else {
                    return false
                }
            })
            tempPedidos.reverse()
        }

        let ultimoId: string = tempPedidos[0] ? String(tempPedidos[0].id) : String(0)
        let pedidoId = ultimoId ? String(parseInt(ultimoId) + 1) : String(1)

        const pedido = new Pedido({id: pedidoId, status: Status.Invalido, ...adicionaPedidoDTO})
        this.pedidos.push(pedido)

        return pedidoId
    }

    async encontrarPedidoPorId(pedidoId: string): Promise<PedidoDTO> {
        const posicaoPedido = this.pedidos.map(item => item.id).indexOf(pedidoId)

        if ( posicaoPedido === -1 ) {
            throw new Error('Pedido não encontrado.')
        }

        const pedido = {
            ...this.pedidos[posicaoPedido],
        }

        return pedido
    }

    async alterarStatusDoPedido(pedidoDTO: PedidoDTO): Promise<PedidoDTO> {
        this.pedidos.forEach(item => {
            if ( item.id === pedidoDTO.id ) {
                item.status = pedidoDTO.status
            }
        })

        return this.pedidos.filter(item => item.id === pedidoDTO.id)[0]
    }

    async listarPedidos(): Promise<PedidoDTO[]> {
        return this.pedidos
    }

    async consultarStatusDoPagamento(pedidoId: string): Promise<PagamentoPorPedidoDTO> {
        return this.pagamentoPorPedido.filter(pagamento => pagamento.pedidoId === pedidoId)[0]
    }

    async alterarStatusDoPagamento(pedidoId: string, status: string): Promise<boolean> {
        this.pagamentoPorPedido.forEach(pagamento => {
            if ( pagamento.pedidoId == pedidoId ) {
                pagamento.status = status
            }
        })
        return true
    }

    async criarPagamentoPorPedido(pedidoId: string): Promise<boolean> {
        const pagamento = {pedidoId, status: StatusPagamento.CONT}
        this.pagamentoPorPedido.push(pagamento)
        return true
    }
}