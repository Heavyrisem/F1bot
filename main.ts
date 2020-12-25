import * as Discord from 'discord.js';
import * as Race from './APIs/Race';
import { GetDriverList } from './DriverInfo';
import { RaceInfo } from './RaceInfo';
// import Axios from 'axios';

// const Discord = require('discord.js');
// const Race = require("./APIs/dist/Race");

interface CommandArgs {

}

const Client = new Discord.Client();


Client.on("ready", async () => {
    console.log("Bot is Ready");

    Client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        switch (command) {
            case "lastrace": {
                let msg = await RaceInfo();
                sendInterResponse(msg, interaction);
                break;
            }
            case "race": {
                let msg = await RaceInfo(args[0].value, args[1].value);
                sendInterResponse(msg, interaction);
                break;
            }
            case "driver": {
                let msg = await GetDriverList((args)&& args[0].value);
                sendInterResponse(msg, interaction);
                break;
            }
            default: {
                sendInterResponse(`준비되지 않은 명령어 입니다.`, interaction);
                break;
            }
        }
    });
})

function sendInterResponse(Message: string, interaction: any): void {
    Client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: Message
            }
        }
    });
}

Client.login("");