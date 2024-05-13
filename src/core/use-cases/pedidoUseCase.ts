import { PagamentoPorPedido, Pedido } from "../../core/entities/pedido";
import { PedidoGatewayInterface } from "../../common/interfaces/gateways";
import { AdicionaPedidoDTO, ProdutoPorPedidoDTO, Status, StatusPagamento } from "../../common/types/pedido";

export default class PedidoUseCase {

    static async criarPedido(adicionaPedidoDTO: AdicionaPedidoDTO, gateway: PedidoGatewayInterface): Promise<Pedido> {
        Pedido.validaDadosDeEntrada(adicionaPedidoDTO)
        if ( ! adicionaPedidoDTO.observacao ) {
            adicionaPedidoDTO.observacao = ''
        }
        return await gateway.criarPedido(adicionaPedidoDTO, Status.Invalido)
            .then(async pedido => {
                await PedidoUseCase.criarPagamentoPorPedido(pedido.id, gateway)
                return pedido
            })
    }

    static async criarPagamentoPorPedido(pedidoId: string, gateway: PedidoGatewayInterface): Promise<PagamentoPorPedido> {
        if ( ! pedidoId || pedidoId == '' ) {
            throw new Error('O pagamento do pedido não possui um formato válido.')
        }
        return await gateway.criarPagamentoPorPedido(pedidoId, StatusPagamento.CONT)
    }

    static async encontrarPedidoPorId(pedidoId: string, gateway: PedidoGatewayInterface): Promise<Pedido> {
        const pedido = await gateway.encontrarPedidoPorId(pedidoId)

        if ( ! pedido ) {
            throw new Error('Pedido não encontrado.')
        }

        return pedido;
    }

    static async alterarStatusDoPedido(pedidoId: string, status: number, gateway: PedidoGatewayInterface): Promise<Pedido> {
        const resposta = await PedidoUseCase.encontrarPedidoPorId(pedidoId, gateway)

        if ( ! resposta ) {
            throw new Error('Pedido não encontrado.')
        }

        const pedido = new Pedido({
            id: resposta.id,
            clienteId: resposta.clienteId,
            data: resposta.data,
            status: status,
            valor: resposta.valor,
            produtos: resposta.produtos.map((produto: ProdutoPorPedidoDTO) => ({
                produtoId: produto.produtoId,
                produtoNome: produto.produtoNome,
                quantidade: produto.quantidade,
                valor: produto.valor
            }))
        })
        return await gateway.alterarStatusDoPedido(pedido)
    }

    static async listarPedidos(gateway: PedidoGatewayInterface): Promise<Pedido[] | null> {
        return await gateway.listarPedidos()
    }

    static async consultarStatusDoPagamento(pedidoId: string, gateway: PedidoGatewayInterface): Promise<PagamentoPorPedido> {
        const resposta = await PedidoUseCase.encontrarPedidoPorId(pedidoId, gateway)

        if ( ! resposta ) {
            throw new Error('Pedido não encontrado.')
        }

        return await gateway.consultarStatusDoPagamento(pedidoId)
    }

    static async alterarStatusDoPagamento(pedidoId: string, status: string, gateway: PedidoGatewayInterface): Promise<PagamentoPorPedido> {
        const resposta = await PedidoUseCase.encontrarPedidoPorId(pedidoId, gateway)

        if ( ! resposta ) {
            throw new Error('Pedido não encontrado.')
        }

        return await gateway.alterarStatusDoPagamento(pedidoId, status)
    }
}