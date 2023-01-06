"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
class WhatsappRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route("/mira").get((_req, res) => {
            res.send({ data: "Hola" });
        });
    }
}
const router = (new WhatsappRoutes()).router;
exports.router = router;
