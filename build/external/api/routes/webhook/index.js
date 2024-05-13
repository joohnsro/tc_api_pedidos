"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_1 = __importDefault(require("./webhook"));
const router = (0, express_1.Router)();
router.post('/webhook/pagamento', webhook_1.default.alterarStatusDoPedido);
exports.default = router;
