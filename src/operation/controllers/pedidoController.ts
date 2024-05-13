import { PedidoDataSourceInterface } from "../../common/interfaces/datasource";
import { AdicionaPedidoDTO, Status, StatusPagamento } from "../../common/types/pedido";
import PedidoUseCase from "../../core/use-cases/pedidoUseCase";
import conexao from "../../external/mongodb/conexao";
import MongoDBPedidoGateway from "../gateways/mongodb/mongoDBPedidoGateway";
import { PedidoPresenter } from "../presenters/pedidoPresenter";
import { PagamentoPresenter } from "../presenters/pagamentoPresenter";

export class PedidoController {
    static async listarPedidos(dataSource: PedidoDataSourceInterface) {
        const gateway = new MongoDBPedidoGateway(dataSource)

        try {
            conexao()
            const listaPedidos = await PedidoUseCase.listarPedidos(gateway)
            if ( ! listaPedidos ) {
                return []
            }

            return PedidoPresenter.toDTOList(listaPedidos)
        } catch(err) {
            throw new Error("Não foi possível listar os pedidos.")
        }
    }

    static async criarPedido(adicionaPedidoDTO: AdicionaPedidoDTO, dataSource: PedidoDataSourceInterface) {
        const gateway = new MongoDBPedidoGateway(dataSource)
        try {
            conexao()
            const pedidoCadastrado = await PedidoUseCase.criarPedido(adicionaPedidoDTO, gateway)
            return PedidoPresenter.getId(pedidoCadastrado)
        } catch(err) {
            throw new Error("Não foi possível criar o pedido.")
        }
    }

    static async alterarStatusDoPedido(pedidoId: string, status: Status, dataSource: PedidoDataSourceInterface) {
        const gateway = new MongoDBPedidoGateway(dataSource)
        try {
            conexao()
            const pedidoAtualizado = await PedidoUseCase.alterarStatusDoPedido(pedidoId, status, gateway)
            return PedidoPresenter.toDTO(pedidoAtualizado)
        } catch(err) {
            throw new Error("Não foi possível alterar o status do pedido.")
        }
    }

    static async encontrarPedidoPorId(pedidoId: string, dataSource: PedidoDataSourceInterface) {
        const gateway = new MongoDBPedidoGateway(dataSource)
        try {
            const pedido = await PedidoUseCase.encontrarPedidoPorId(pedidoId, gateway)

            if ( ! pedido ) {
                throw new Error('Pedido não encontrado.')
            }

            return PedidoPresenter.toDTO(pedido)
        } catch(err) {
            conexao()
            throw new Error("Não foi possível encontrar o pedido.")
        }
    }

    static async consultarStatusDoPagamento(pedidoId: string, dataSource: PedidoDataSourceInterface) {
        const gateway = new MongoDBPedidoGateway(dataSource)
        try {
            conexao()
            const pagamentoPorPedido = await PedidoUseCase.consultarStatusDoPagamento(pedidoId, gateway)
            return PagamentoPresenter.getStatus(pagamentoPorPedido)
        } catch(err) {
            throw new Error("Não foi possível encontrar o status do pagamento.")
        }
    }

    static async alterarStatusDoPagamento(pedidoId: string, status: StatusPagamento, dataSource: PedidoDataSourceInterface) {
        const gateway = new MongoDBPedidoGateway(dataSource)
        try {
            conexao()
            const pagamentoPorPedido = await PedidoUseCase.alterarStatusDoPagamento(pedidoId, status, gateway)
            return PagamentoPresenter.getStatus(pagamentoPorPedido)
        } catch(err) {
            throw new Error("Não foi possível alterar o status do pagamento.")
        }
    }
}