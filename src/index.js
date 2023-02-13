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
const amqplib_1 = __importDefault(require("amqplib"));
const core_1 = __importDefault(require("@actions/core"));
const github_1 = __importDefault(require("@actions/github"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const branch = core_1.default.getInput("branch");
        const connection = yield amqplib_1.default.connect("amqp://localhost"); // Alterar para IP do servidor (laptop)
        const channel = yield connection.createChannel();
        const queue = "notify-discord";
        yield channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(branch));
        console.log(`[x] Sent ${branch} to ${queue}`);
        yield channel.close();
        yield connection.close();
        const payload = JSON.stringify(github_1.default.context.payload, undefined, 2);
        console.log(`The event payload: ${payload}`);
    });
}
main().catch(error => {
    console.log(error.message);
});
