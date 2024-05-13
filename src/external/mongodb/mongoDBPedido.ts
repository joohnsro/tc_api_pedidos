import { PedidoDTO, AdicionaPedidoDTO, ProdutoPorPedidoDTO, Status, StatusPagamento, PagamentoPorPedidoDTO } from "../../common/types/pedido";
import { PedidoDataSourceInterface } from "../../common/interfaces/datasource";
import Pedido from "./model/pedido";
import Pagamento from "./model/pagamento";
import { ObjectId } from "mongodb";

export default class MongoDBPedido implements PedidoDataSourceInterface {

    async criarPedido(pedido: AdicionaPedidoDTO, status: Status): Promise<string> {
        const { clienteId, data, valor, observacao, produtos } = pedido
        const novoPedido = new Pedido({ 
            clienteId, data, valor, observacao, produtos, status
        })
        return await novoPedido.save()
            .then(({_id}) => String(_id))
    }

    async encontrarPedidoPorId(pedidoId: string): Promise<PedidoDTO> {
        return await Pedido.findById(pedidoId)
            .exec()
            .then((pedidoEncontrado: any) => {
                if ( ! pedidoEncontrado?._id ) {
                    return null
                }

                let produtos: ProdutoPorPedidoDTO[] = []
                if ( pedidoEncontrado.produtos && pedidoEncontrado.produtos.length > 0 ) {
                    pedidoEncontrado.produtos.forEach((produto: ProdutoPorPedidoDTO) => {
                        const produtoPorPedidoDTO: ProdutoPorPedidoDTO = {
                            produtoId: produto.produtoId,
                            produtoNome: produto.produtoNome,
                            quantidade: produto.quantidade,
                            valor: produto.valor
                        }
                        produtos.push(produtoPorPedidoDTO)
                    })   
                }

                const pedido: PedidoDTO = {
                    id: String(pedidoEncontrado._id),
                    clienteId: String(pedidoEncontrado.clienteId),
                    data: pedidoEncontrado.data,
                    status: pedidoEncontrado.status,
                    valor: pedidoEncontrado.valor,
                    observacao: pedidoEncontrado.observacao,
                    produtos,
                }

                return pedido
            })
            .catch(err => err)
    }

    async alterarStatusDoPedido(pedidoDTO: PedidoDTO): Promise<PedidoDTO> {
        const pedidoObjectId = new ObjectId(pedidoDTO.id)
        return await Pedido.findByIdAndUpdate(pedidoObjectId, {
                status: pedidoDTO.status
            })
            .exec()
            .then(() => pedidoDTO)
            .catch(err => err)
    }

    async listarPedidos(): Promise<PedidoDTO[]> {
        return await Pedido.find({ status: { $gt: 0, $lt: 4 } }).sort({ status: -1, data: 1 })
            .exec()
            .then(pedidosEncontrados => {

                const pedidos: PedidoDTO[] = []

                pedidosEncontrados.forEach((pedidoEncontrado: any) => {

                    let produtos: ProdutoPorPedidoDTO[] = []
                    if ( pedidoEncontrado.produtos && pedidoEncontrado.produtos.length > 0 ) {
                        pedidoEncontrado.produtos.forEach((produto: ProdutoPorPedidoDTO) => {
                            const produtoPorPedidoDTO: ProdutoPorPedidoDTO = {
                                produtoId: produto.produtoId,
                                produtoNome: produto.produtoNome,
                                quantidade: produto.quantidade,
                                valor: produto.valor
                            }
                            produtos.push(produtoPorPedidoDTO)
                        })   
                    }
    
                    const pedido: PedidoDTO = {
                        id: String(pedidoEncontrado._id),
                        clienteId: String(pedidoEncontrado.clienteId),
                        data: pedidoEncontrado.data,
                        status: pedidoEncontrado.status,
                        valor: pedidoEncontrado.valor,
                        observacao: pedidoEncontrado.observacao,
                        produtos,
                    }

                    pedidos.push(pedido)
                })

                return pedidos
            })
            .catch(err => err)
    }

    async consultarStatusDoPagamento(pedidoId: string): Promise<PagamentoPorPedidoDTO> {
        const pedidoObjectId = new ObjectId(pedidoId)
        return await Pagamento.findOne({ pedidoId: pedidoObjectId })
            .exec()
            .then((pagamentoEncontrado: any) => {
                if ( ! pagamentoEncontrado?._id ) {
                    return null
                }

                const pagamento: PagamentoPorPedidoDTO = {
                    pedidoId: pedidoId,
                    status: StatusPagamento[pagamentoEncontrado.status as keyof typeof StatusPagamento]
                }

                return pagamento
            })
            .catch(err => err)
    }

    async alterarStatusDoPagamento(pedidoId: string, status: string): Promise<boolean> {
        const pedidoObjectId = new ObjectId(pedidoId)
        return await Pagamento.findOneAndUpdate({ pedidoId: pedidoObjectId}, { status: status })
            .exec()
            .then(() => true)
            .catch(err => err)
    }

    async criarPagamentoPorPedido(pedidoId: string, status: StatusPagamento): Promise<boolean> {
        const pedidoObjectId = new ObjectId(pedidoId)
        const novoPagamento = new Pagamento({ 
            pedidoId: pedidoObjectId, status
        })
        return await novoPagamento.save()
            .then(({_id}) => true)
    }

}