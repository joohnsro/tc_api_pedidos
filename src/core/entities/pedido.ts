import AssertionConcern from "../../common/asserts/assertionConcern"
import { AdicionaPedidoDTO, PedidoDTO, ProdutoPorPedidoDTO, PagamentoPorPedidoDTO } from "../../common/types/pedido"

export class Pedido {

    private _id: string
    private _clienteId: string
    private _data: string
    private _status: number
    private _valor: number
    private _observacao?: string
    private _produtos: ProdutoPorPedidoDTO[]

    constructor(pedido: PedidoDTO) {
        Pedido.validaDadosDeEntrada(pedido)

        if ( ! pedido.id ) {
            throw new Error('O pedido não possui um formato válido.')
        }

        const produtos: ProdutoPorPedidoDTO[] = pedido.produtos.map((produto: ProdutoPorPedidoDTO) => ({
            produtoId: produto.produtoId,
            produtoNome: produto.produtoNome,
            quantidade: produto.quantidade,
            valor: produto.valor
        }))

        this._id = pedido.id
        this._clienteId = pedido.clienteId
        this._data = pedido.data
        this._status = pedido.status
        this._valor = pedido.valor
        this._observacao = pedido.observacao
        this._produtos = produtos
    }

    get id() : string {
        return this._id
    }

    get clienteId() : string {
        return this._clienteId
    }

    get data() : string {
        return this._data
    }

    get status() : number {
        return this._status
    }

    get valor() : number {
        return this._valor
    }

    get observacao() : string | undefined {
        return this._observacao
    }

    get produtos() : ProdutoPorPedidoDTO[] {
        return this._produtos
    }

    public static validaDadosDeEntrada(pedido: AdicionaPedidoDTO | PedidoDTO) {
        const propriedades = [ 'clienteId', 'data', 'status', 'valor', 'produtos' ]
        Object.values(propriedades).forEach(prop => {
            switch (prop) {
                case 'clienteId':
                    AssertionConcern.AssertArgumentNotEmpty(pedido[prop], 'O pedido não possui um formato válido.')
                    break
                case 'data':
                    AssertionConcern.AssertArgumentNotValidDate(pedido[prop], 'O pedido não possui um formato válido.')
                    break
                case 'valor':
                    AssertionConcern.AssertArgumentNotBiggerThanZero(pedido[prop], 'O pedido não possui um formato válido.')
                    break
                case 'produtos':
                    AssertionConcern.AssertArgumentNotBiggerThanZero(pedido[prop].length, 'O pedido não possui um formato válido.')
                    break
            }
        })
    }
}

export class ProdutoPorPedido {

    private _produtoId: string
    private _produtoNome: string
    private _quantidade: number
    private _valor: number

    constructor(produtoPorPedido: ProdutoPorPedidoDTO) {
        ProdutoPorPedido.validaDadosDeEntrada(produtoPorPedido)

        this._produtoId = produtoPorPedido.produtoId
        this._produtoNome = produtoPorPedido.produtoNome
        this._quantidade = produtoPorPedido.quantidade
        this._valor = produtoPorPedido.valor
    }

    get produtoId() {
        return this._produtoId
    }

    get produtoNome() {
        return this._produtoNome
    }

    get quantidade() {
        return this._quantidade
    }

    get valor() {
        return this._valor
    }

    public static validaDadosDeEntrada(produtoPorPedido: ProdutoPorPedidoDTO) {
        const propriedades = [ 'produtoId', 'produtoNome', 'quantidade' ]
        Object.values(propriedades).forEach(prop => {
            switch (prop) {
                case 'produtoId':
                    AssertionConcern.AssertArgumentNotNull(produtoPorPedido[prop], 'O produto do pedido não possui um formato válido.')
                    break
                case 'produtoNome':
                    AssertionConcern.AssertArgumentNotEmpty(produtoPorPedido[prop], 'O pedido não possui um formato válido.')
                    break
                case 'quantidade':
                    AssertionConcern.AssertArgumentNotBiggerThanZero(produtoPorPedido[prop], 'O produto do pedido não possui um formato válido.')
                    break  
            }
        })
    }
}

export class PagamentoPorPedido {

    private _pedidoId: string
    private _status: string

    constructor(pagamentoPorPedido: PagamentoPorPedidoDTO) {
        PagamentoPorPedido.validaDadosDeEntrada(pagamentoPorPedido)

        this._pedidoId = String(pagamentoPorPedido.pedidoId)
        this._status = String(pagamentoPorPedido.status)
    }

    get pedidoId() {
        return this._pedidoId
    }

    get status() {
        return this._status
    }

    public static validaDadosDeEntrada(pagamentoPorPedido: PagamentoPorPedidoDTO) {
        const propriedades = [ 'pedidoId', 'status' ]
        Object.values(propriedades).forEach(prop => {
            switch (prop) {
                case 'pedidoId':
                    AssertionConcern.AssertArgumentNotNull(String(pagamentoPorPedido[prop]), 'O pagamento do pedido não possui um formato válido.')
                    break
                case 'status':
                    AssertionConcern.AssertArgumentNotNull(String(pagamentoPorPedido[prop]), 'O pagamento não possui um formato válido.')
                    AssertionConcern.AssertArgumentNotEmpty(String(pagamentoPorPedido[prop]), 'O pagamento não possui um formato válido.')
                    break                 
            }
        })
    }
}