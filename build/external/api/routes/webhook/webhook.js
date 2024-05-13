"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pedidoController_1 = require("../../../../operation/controllers/pedidoController");
const pedido_1 = require("../../../../common/types/pedido");
const mongoDBPedido_1 = __importDefault(require("../../../mongodb/mongoDBPedido"));
exports.default = {
    alterarStatusDoPedido: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const notification = req.body;
        /*
         * - Como este é um mock de webhook do tipo de pagamento, seguem observações:
         *      - Não há necessidade da confirmação do recebimento da notificação
         *      - Com isso, não é recebido o payment_id para busca do pedido
         *      - Sendo assim, o pedidoId e o novo status serão enviados para o webhook no corpo da requisição
         */
        const dataSource = new mongoDBPedido_1.default();
        yield pedidoController_1.PedidoController.encontrarPedidoPorId(notification.pedidoId, dataSource)
            .then((pedidoDto) => __awaiter(void 0, void 0, void 0, function* () {
            const statusValidos = ["CONT", "APRO"];
            if (!statusValidos.includes(notification.status)) {
                throw new Error('Tipo de status inválido, nesse mock somente os valores "CONT" e "APRO" são aceitos.');
            }
            yield pedidoController_1.PedidoController.alterarStatusDoPagamento(pedidoDto.id, notification.status, dataSource)
                .then(() => __awaiter(void 0, void 0, void 0, function* () {
                yield pedidoController_1.PedidoController.alterarStatusDoPedido(pedidoDto.id, pedido_1.Status.Recebido, dataSource)
                    .then(pedido => res.send(pedido))
                    .catch(error => res.send({ error: error.message }));
            }));
        }))
            .catch(error => res.send({ error: error.message }));
    })
};
