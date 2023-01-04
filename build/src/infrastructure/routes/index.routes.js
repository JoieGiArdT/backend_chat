"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wtpp_routes_1 = __importDefault(require("./wtpp.routes"));
const messages_routes_1 = __importDefault(require("./messages.routes"));
class Routes {
    constructor(app) {
        app.use('/v1/wtpp', wtpp_routes_1.default);
        app.use('/v1/messages', messages_routes_1.default);
    }
}
exports.default = Routes;
