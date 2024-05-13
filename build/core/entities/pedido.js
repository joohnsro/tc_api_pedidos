"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagamentoPorPedido = exports.ProdutoPorPedido = exports.Pedido = void 0;
const assertionConcern_1 = __importDefault(require("../../common/asserts/assertionConcern"));
class Pedido {
    constructor(pedido) {
        Pedido.validaDadosDeEntrada(pedido);
        if (!pedido.id) {
            throw new Error('O pedido não possui um formato válido.');
        }
        const produtos = pedido.produtos.map((produto) => ({
            produtoId: produto.produtoId,
            produtoNome: produto.produtoNome,
            quantidade: produto.quantidade,
            valor: produto.valor
        }));
        this._id = pedido.id;
        this._clienteId = pedido.clienteId;
        this._data = pedido.data;
        this._status = pedido.status;
        this._valor = pedido.valor;
        this._observacao = pedido.observacao;
        this._produtos = produtos;
    }
    get id() {
        return this._id;
    }
    get clienteId() {
        return this._clienteId;
    }
    get data() {
        return this._data;
    }
    get status() {
        return this._status;
    }
    get valor() {
        return this._valor;
    }
    get observacao() {
        return this._observacao;
    }
    get produtos() {
        return this._produtos;
    }
    static validaDadosDeEntrada(pedido) {
        const propriedades = ['clienteId', 'data', 'status', 'valor', 'produtos'];
        Object.values(propriedades).forEach(prop => {
            switch (prop) {
                case 'clienteId':
                    assertionConcern_1.default.AssertArgumentNotEmpty(pedido[prop], 'O pedido não possui um formato válido.');
                    break;
                case 'data':
                    assertionConcern_1.default.AssertArgumentNotValidDate(pedido[prop], 'O pedido não possui um formato válido.');
                    break;
                case 'valor':
                    assertionConcern_1.default.AssertArgumentNotBiggerThanZero(pedido[prop], 'O pedido não possui um formato válido.');
                    break;
                case 'produtos':
                    assertionConcern_1.default.AssertArgumentNotBiggerThanZero(pedido[prop].length, 'O pedido não possui um formato válido.');
                    break;
            }
        });
    }
}
exports.Pedido = Pedido;
class ProdutoPorPedido {
    constructor(produtoPorPedido) {
        ProdutoPorPedido.validaDadosDeEntrada(produtoPorPedido);
        this._produtoId = produtoPorPedido.produtoId;
        this._produtoNome = produtoPorPedido.produtoNome;
        this._quantidade = produtoPorPedido.quantidade;
        this._valor = produtoPorPedido.valor;
    }
    get produtoId() {
        return this._produtoId;
    }
    get produtoNome() {
        return this._produtoNome;
    }
    get quantidade() {
        return this._quantidade;
    }
    get valor() {
        return this._valor;
    }
    static validaDadosDeEntrada(produtoPorPedido) {
        const propriedades = ['produtoId', 'produtoNome', 'quantidade'];
        Object.values(propriedades).forEach(prop => {
            switch (prop) {
                case 'produtoId':
                    assertionConcern_1.default.AssertArgumentNotNull(produtoPorPedido[prop], 'O produto do pedido não possui um formato válido.');
                    break;
                case 'produtoNome':
                    assertionConcern_1.default.AssertArgumentNotEmpty(produtoPorPedido[prop], 'O pedido não possui um formato válido.');
                    break;
                case 'quantidade':
                    assertionConcern_1.default.AssertArgumentNotBiggerThanZero(produtoPorPedido[prop], 'O produto do pedido não possui um formato válido.');
                    break;
            }
        });
    }
}
exports.ProdutoPorPedido = ProdutoPorPedido;
class PagamentoPorPedido {
    constructor(pagamentoPorPedido) {
        PagamentoPorPedido.validaDadosDeEntrada(pagamentoPorPedido);
        this._pedidoId = String(pagamentoPorPedido.pedidoId);
        this._status = String(pagamentoPorPedido.status);
    }
    get pedidoId() {
        return this._pedidoId;
    }
    get status() {
        return this._status;
    }
    static validaDadosDeEntrada(pagamentoPorPedido) {
        const propriedades = ['pedidoId', 'status'];
        Object.values(propriedades).forEach(prop => {
            switch (prop) {
                case 'pedidoId':
                    assertionConcern_1.default.AssertArgumentNotNull(String(pagamentoPorPedido[prop]), 'O pagamento do pedido não possui um formato válido.');
                    break;
                case 'status':
                    assertionConcern_1.default.AssertArgumentNotNull(String(pagamentoPorPedido[prop]), 'O pagamento não possui um formato válido.');
                    assertionConcern_1.default.AssertArgumentNotEmpty(String(pagamentoPorPedido[prop]), 'O pagamento não possui um formato válido.');
                    break;
            }
        });
    }
}
exports.PagamentoPorPedido = PagamentoPorPedido;
