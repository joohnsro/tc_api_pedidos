import { Router } from "express"
import webhook from "./webhook"

const router = Router()
router.post('/webhook/pagamento', webhook.alterarStatusDoPedido)

export default router