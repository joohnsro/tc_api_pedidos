"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPagamento = exports.StatusName = exports.Status = void 0;
var Status;
(function (Status) {
    Status[Status["Invalido"] = 0] = "Invalido";
    Status[Status["Recebido"] = 1] = "Recebido";
    Status[Status["EmPreparacao"] = 2] = "EmPreparacao";
    Status[Status["Pronto"] = 3] = "Pronto";
    Status[Status["Finalizado"] = 4] = "Finalizado";
})(Status || (exports.Status = Status = {}));
var StatusName;
(function (StatusName) {
    StatusName[StatusName["invalido"] = 0] = "invalido";
    StatusName[StatusName["recebido"] = 1] = "recebido";
    StatusName[StatusName["em-preparacao"] = 2] = "em-preparacao";
    StatusName[StatusName["pronto"] = 3] = "pronto";
    StatusName[StatusName["finalizado"] = 4] = "finalizado";
})(StatusName || (exports.StatusName = StatusName = {}));
var StatusPagamento;
(function (StatusPagamento) {
    StatusPagamento["APRO"] = "APRO";
    StatusPagamento["OTHE"] = "OTHE";
    StatusPagamento["CONT"] = "CONT";
    StatusPagamento["CALL"] = "CALL";
    StatusPagamento["FUND"] = "FUND";
    StatusPagamento["SECU"] = "SECU";
    StatusPagamento["EXPI"] = "EXPI";
    StatusPagamento["FORM"] = "FORM";
})(StatusPagamento || (exports.StatusPagamento = StatusPagamento = {}));
