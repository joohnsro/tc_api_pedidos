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
exports.PedidoController = void 0;
const pedidoUseCase_1 = __importDefault(require("../../core/use-cases/pedidoUseCase"));
const conexao_1 = __importDefault(require("../../external/mongodb/conexao"));
const mongoDBPedidoGateway_1 = __importDefault(require("../gateways/mongodb/mongoDBPedidoGateway"));
const pedidoPresenter_1 = require("../presenters/pedidoPresenter");
const pagamentoPresenter_1 = require("../presenters/pagamentoPresenter");
class PedidoController {
    static listarPedidos(dataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const gateway = new mongoDBPedidoGateway_1.default(dataSource);
            try {
                (0, conexao_1.default)();
                const listaPedidos = yield pedidoUseCase_1.default.listarPedidos(gateway);
                if (!listaPedidos) {
                    return [];
                }
                return pedidoPresenter_1.PedidoPresenter.toDTOList(listaPedidos);
            }
            catch (err) {
                throw new Error("Não foi possível listar os pedidos." + JSON.stringify(err));
            }
        });
    }
    static criarPedido(adicionaPedidoDTO, dataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const gateway = new mongoDBPedidoGateway_1.default(dataSource);
            try {
                (0, conexao_1.default)();
                const pedidoCadastrado = yield pedidoUseCase_1.default.criarPedido(adicionaPedidoDTO, gateway);
                return pedidoPresenter_1.PedidoPresenter.getId(pedidoCadastrado);
            }
            catch (err) {
                throw new Error("Não foi possível criar o pedido." + JSON.stringify(err));
            }
        });
    }
    static alterarStatusDoPedido(pedidoId, status, dataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const gateway = new mongoDBPedidoGateway_1.default(dataSource);
            try {
                (0, conexao_1.default)();
                const pedidoAtualizado = yield pedidoUseCase_1.default.alterarStatusDoPedido(pedidoId, status, gateway);
                return pedidoPresenter_1.PedidoPresenter.toDTO(pedidoAtualizado);
            }
            catch (err) {
                throw new Error("Não foi possível alterar o status do pedido." + JSON.stringify(err));
            }
        });
    }
    static encontrarPedidoPorId(pedidoId, dataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const gateway = new mongoDBPedidoGateway_1.default(dataSource);
            try {
                const pedido = yield pedidoUseCase_1.default.encontrarPedidoPorId(pedidoId, gateway);
                if (!pedido) {
                    throw new Error('Pedido não encontrado.');
                }
                return pedidoPresenter_1.PedidoPresenter.toDTO(pedido);
            }
            catch (err) {
                (0, conexao_1.default)();
                throw new Error("Não foi possível encontrar o pedido." + JSON.stringify(err));
            }
        });
    }
    static consultarStatusDoPagamento(pedidoId, dataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const gateway = new mongoDBPedidoGateway_1.default(dataSource);
            try {
                (0, conexao_1.default)();
                const pagamentoPorPedido = yield pedidoUseCase_1.default.consultarStatusDoPagamento(pedidoId, gateway);
                return pagamentoPresenter_1.PagamentoPresenter.getStatus(pagamentoPorPedido);
            }
            catch (err) {
                throw new Error("Não foi possível encontrar o status do pagamento." + JSON.stringify(err));
            }
        });
    }
    static alterarStatusDoPagamento(pedidoId, status, dataSource) {
        return __awaiter(this, void 0, void 0, function* () {
            const gateway = new mongoDBPedidoGateway_1.default(dataSource);
            try {
                (0, conexao_1.default)();
                const pagamentoPorPedido = yield pedidoUseCase_1.default.alterarStatusDoPagamento(pedidoId, status, gateway);
                return pagamentoPresenter_1.PagamentoPresenter.getStatus(pagamentoPorPedido);
            }
            catch (err) {
                throw new Error("Não foi possível alterar o status do pagamento." + JSON.stringify(err));
            }
        });
    }
}
exports.PedidoController = PedidoController;
