const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Reports a member",
    usage: "<mention | id>",
    run: async (client, message, args) => {
        if (message.deletable) message.delete();

        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!rMember)
            return message.reply("Couldn't find that person").then(m => m.delete({timeout: 5000}));

        if (rMember.hasPermission("BAN_MEMBERS") || rMember.user.bot)
            return message.reply("Can't report that member").then(m => m.delete({timeout: 5000}));

        if (!args[1])
            return message.channel.send("Please provide a reason for the report!").then(m => m.delete({timeout: 5000}));

        const channel = message.guild.channels.cache.find(channel => channel.name === "reports");

        if (!channel)
            return message.channel.send("I could not find a \`#reports`\ channel").then(m => m.delete({timeout: 5000}));

        const embed = new MessageEmbed()
            .setColor("#ff0000")
            .setTimestamp()
            .setFooter(message.guild.name, message.guild.iconURL)
            .setAuthor("Reported member", rMember.user.displayAvatarURL())
            .setDescription(stripIndents`**> Member:** ${rMember} (${rMember.id})
            **> Reported by:** ${message.member} (${message.member.id})
            **> Reported in:** ${message.channel}
            **> Reason:** ${args.slice(1).join(" ")}`);
        
        message.channel.send("User successfully reported!")

        return channel.send(embed);
    }
}
