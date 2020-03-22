module.exports = {
    name: "say",
    aliases: ["bc", "broadcast"],
    category: "moderation",
    description: "Says your input via the bot",
    usage: "<input>",
    run: async (client, message, args) => {
        const { Client, MessageEmbed, Collection} = require("discord.js");
        
        if (message.deletable) message.delete();

        if (args.length < 1)
            return message.reply("Nothing to say?").then(m => m.delete(5000));

        const roleColor = message.guild.me.displayHexColor === "#000000" ? "#ffffff" : message.guild.me.displayHexColor;

            const embed = new MessageEmbed()
            .setTitle("New Message!")
            .setColor(roleColor)
            .setDescription(args.join(" "))
            .setTimestamp()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setFooter(client.user.username, client.user.displayAvatarURL());
            
            message.channel.send(embed);
    }
}