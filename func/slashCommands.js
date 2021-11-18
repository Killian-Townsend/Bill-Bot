const Discord = require("discord.js");
const Config = require("../config.json");

class SlashCommands {

    Client;

    Setup() {

        try {

            if (this.Client === undefined) throw new ReferenceError();



        } catch (err) {
            console.error(err);
        }




    }

    AddClient(client) {
        this.Client = client;
    }

}