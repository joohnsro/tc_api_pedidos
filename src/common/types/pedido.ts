export enum Status {
    Invalido = 0,
    Recebido = 1,
    EmPreparacao = 2,
    Pronto = 3,
    Finalizado = 4
}

export enum StatusName {
    'invalido',
    'recebido',
    'em-preparacao',
    'pronto',
    'finalizado'
}

export type AdicionaPedidoDTO = {
    clienteId: string
    data: string
    valor: number
    observacao?: string
    produtos: ProdutoPorPedidoDTO[]
}

export type PedidoDTO = {
    id: string
    clienteId: string
    data: string
    status: number
    valor: number
    observacao?: string
    produtos: ProdutoPorPedidoDTO[]
}

export type ProdutoPorPedidoDTO = {
    produtoId: string
    produtoNome: string
    quantidade: number
    valor: number
}

export type PagamentoPorPedidoDTO = {
    pedidoId: string
    status: StatusPagamento
}

export enum StatusPagamento {
    APRO = 'APRO',
    OTHE = 'OTHE',
    CONT = 'CONT',
    CALL = 'CALL',
    FUND = 'FUND',
    SECU = 'SECU',
    EXPI = 'EXPI',
    FORM = 'FORM'
}