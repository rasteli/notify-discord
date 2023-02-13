"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const discord_js_1 = require("discord.js");
const getMessage_1 = require("./utils/getMessage");
const DEV_ROLE_ID = "1044322898355167302";
const NOTIFICATIONS_CHANNEL_ID = "1074433899192656005";
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = core.getInput("token");
        const branch = core.getInput("branch");
        const type = core.getInput("type");
        const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
        client.once(discord_js_1.Events.ClientReady, c => {
            console.log(`Logged in as ${c.user.tag}!`);
            const channel = client.channels.cache.get(NOTIFICATIONS_CHANNEL_ID);
            const message = (0, getMessage_1.getMessage)(branch, type);
            channel.send(`<@&${DEV_ROLE_ID}> ${message}`);
            setTimeout(() => {
                client.destroy();
            }, 3000);
        });
        client.login(token);
        const payload = JSON.stringify(github.context.payload, undefined, 2);
        console.log(`The event payload: ${payload}`);
    });
}
main().catch(error => {
    core.setFailed(error.message);
});
