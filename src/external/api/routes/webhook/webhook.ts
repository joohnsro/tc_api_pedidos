import { Request, Response } from "express"
import { PedidoController } from "../../../../operation/controllers/pedidoController"
import { PedidoDTO, Status } from "../../../../common/types/pedido"
import MongoDBPedido from "../../../mongodb/mongoDBPedido"

export default {
    alterarStatusDoPedido: async (req: Request, res: Response) => {
        const notification: any = req.body
        
        /*
         * - Como este é um mock de webhook do tipo de pagamento, seguem observações:
         *      - Não há necessidade da confirmação do recebimento da notificação
         *      - Com isso, não é recebido o payment_id para busca do pedido 
         *      - Sendo assim, o pedidoId e o novo status serão enviados para o webhook no corpo da requisição
         */
        
        const dataSource = new MongoDBPedido()
        await PedidoController.encontrarPedidoPorId(notification.pedidoId, dataSource)
            .then(async (pedidoDto: PedidoDTO) => {

                const statusValidos = ["CONT", "APRO"]
                if ( ! statusValidos.includes(notification.status) ) {
                    throw new Error('Tipo de status inválido, nesse mock somente os valores "CONT" e "APRO" são aceitos.')
                }

                await PedidoController.alterarStatusDoPagamento(pedidoDto.id, notification.status, dataSource)
                    .then(async () => {
                        await PedidoController.alterarStatusDoPedido(pedidoDto.id, Status.Recebido, dataSource)
                            .then(pedido => res.send(pedido))
                            .catch(error => res.send({error: error.message}))
                    })
                
            })
            .catch(error => res.send({error: error.message}))
    }

}