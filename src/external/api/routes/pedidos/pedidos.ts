import { Request, Response } from "express"
import { PedidoController } from "../../../../operation/controllers/pedidoController"
import MongoDBPedido from "../../../mongodb/mongoDBPedido"
import { AdicionaPedidoDTO } from "../../../../common/types/pedido"

export default {
    listarPedidos: async(req: Request, res: Response) => {
        const dataSource = new MongoDBPedido()
        await PedidoController.listarPedidos(dataSource)
            .then(pedidos => res.send(pedidos))
            .catch(error => res.send({error: error.message}))
    },
    alterarStatusDoPedido: async(req: Request, res: Response) => {
        const {pedidoId} = req.params
        const {status} = req.body
        const dataSource = new MongoDBPedido()
        await PedidoController.alterarStatusDoPedido(pedidoId, status, dataSource)
            .then(pedido => res.send(pedido))
            .catch(error => res.send({error: error.message}))
    },
    checkout: async(req: Request, res: Response) => {
        const {clienteId, data, valor, produtos, observacao} = req.body
        const dataSource = new MongoDBPedido()

        const pedidoDTO: AdicionaPedidoDTO = {
            clienteId: clienteId,
            data: data,
            valor: valor,
            observacao: observacao ? observacao : undefined,
            produtos: produtos
        }

        await PedidoController.criarPedido(pedidoDTO, dataSource)
            .then(pedido => res.send(pedido))
            .catch(error => res.send({error: error.message}))
    },
    consultarStatusDoPagamento: async (req: Request, res: Response) => {
        const {pedidoId} = req.params
        const dataSource = new MongoDBPedido()

        await PedidoController.consultarStatusDoPagamento(pedidoId, dataSource)
            .then(status => res.send(status))
            .catch(error => res.send({error: error.message}))
    }
}