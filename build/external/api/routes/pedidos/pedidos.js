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
const mongoDBPedido_1 = __importDefault(require("../../../mongodb/mongoDBPedido"));
exports.default = {
    listarPedidos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const dataSource = new mongoDBPedido_1.default();
        yield pedidoController_1.PedidoController.listarPedidos(dataSource)
            .then(pedidos => res.send(pedidos))
            .catch(error => res.send({ error: error.message }));
    }),
    alterarStatusDoPedido: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { pedidoId } = req.params;
        const { status } = req.body;
        const dataSource = new mongoDBPedido_1.default();
        yield pedidoController_1.PedidoController.alterarStatusDoPedido(pedidoId, status, dataSource)
            .then(pedido => res.send(pedido))
            .catch(error => res.send({ error: error.message }));
    }),
    checkout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { clienteId, data, valor, produtos, observacao } = req.body;
        const dataSource = new mongoDBPedido_1.default();
        const pedidoDTO = {
            clienteId: clienteId,
            data: data,
            valor: valor,
            observacao: observacao ? observacao : undefined,
            produtos: produtos
        };
        yield pedidoController_1.PedidoController.criarPedido(pedidoDTO, dataSource)
            .then(pedido => res.send(pedido))
            .catch(error => res.send({ error: error.message }));
    }),
    consultarStatusDoPagamento: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { pedidoId } = req.params;
        const dataSource = new mongoDBPedido_1.default();
        yield pedidoController_1.PedidoController.consultarStatusDoPagamento(pedidoId, dataSource)
            .then(status => res.send(status))
            .catch(error => res.send({ error: error.message }));
    })
};
