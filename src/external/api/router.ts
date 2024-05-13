import { Router } from "express"
import pedidos from "./routes/pedidos"
import weebhook from "./routes/webhook"

const router = Router()
router.use(pedidos)
router.use(weebhook)

export default router