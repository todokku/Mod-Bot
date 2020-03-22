module.exports = {
    name: "cat",
    aliases: ["kitten", "kitty"],
    category: "info",
    description: "Shows a cute picture of a cat",
    run: async (client, message, args) => {

        let msg = await message.channel.send("Looking for kitty...")

        let {body} = await superagent
        .get(`http://aws.random.cat/meow`)
        //console.log(body.file)
        if(!{body}) return message.channel.send("I broke! Try again.")

            let cEmbed = new Discord.RichEmbed()
            .setColor(colours.cyan)
            .setAuthor(`ModBot CATS!`, message.guild.iconURL)
            .setImage(body.file)
            .setTimestamp()
            .setFooter(`ModBot`, bot.user.displayAvatarURL)

            message.channel.send({embed: cEmbed});

            msg.delete();

    }
}