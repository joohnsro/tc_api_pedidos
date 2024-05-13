import { Router } from "express"
import pedidos from "./pedidos"

const router = Router()
router.post('/checkout', pedidos.checkout)
router.put('/pedido/:pedidoId/status', pedidos.alterarStatusDoPedido)
router.get('/pedido/:pedidoId/pagamento', pedidos.consultarStatusDoPagamento)
router.get('/pedidos', pedidos.listarPedidos)

export default router