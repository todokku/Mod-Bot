const { getMember, formatDate } = require("../../functions.js");
const { MemberEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");

module.exports = {
    name: "whois",
    aliases: ["userinfo", "user", "who"],
    category: "info",
    description: "Returns user information",
    usage: "[username | id, | mention]",
    run: async (client, message, args) => {
        const member = getMember(message, args.join(" "));

        // Member variables
        const joined = formatDate(member, joinedAt);
        const role = member.roles
            .filter(r => r.id !== message.guild.id)
            .map(r => r)
            .join(", ") || "none";

        // User variables
        const created = formatDate(member.user.createdAt);

        const embed = new MemberEmbed()
            .setFooter(member.displayName, member.user.displayAvatarURL())
            .setThumbnail(member.user.displayAvatarURL())

            .addField('Member information', stripIndents`**> Display name:** ${member.displayName}
            **> Joined at:** ${joined}
            **> Roles:** ${roles}`, true)

            .addField('User information', stripIndents`**> ID:** ${member.user.id}
            **> Username:** ${member.user.username}
            **> Discord Tag:** ${member.user.tag}
            **> Created at:** ${created}`, true)

            .setTimestamp()

        if (member.user.presence.game)
            embed.addField('Currently playing', `**> Name:** ${member.user.presence.game.name}`);

        message.channel.send(embed);
    }
}