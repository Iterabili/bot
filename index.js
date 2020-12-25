const { Client, MessageAttachment } = require('discord.js');
const client = new Client();

client.on('message', newMsg);
client.on("guildMemberAdd", async member => {
    const joinRole = member.guild.roles.cache.find(role => role.name === 'Гость');
    await member.roles.add(joinRole);
});

function newMsg(message) {
    if (message.content === '!!') {
            if (message.channel.name === 'авторизация') {
                message.channel.messages.fetch(message.reference.messageID, true)
                    .then( async message => {
                         const guildroles = message.guild.roles.cache;
                        await message.member.roles.remove(guildroles.find(role => role.name === 'Гость'));
                        if (message.content.startsWith('!я ')) { 
                            const e = message.content.indexOf('@') - 1;
                            message.member.setNickname(message.content.slice(3, e));
                            await message.member.roles.add(message.mentions.roles);
                            await message.member.roles.add(guildroles.find(role => role.name === 'Студент'));
                        } 
                        if (message.content.startsWith('!я+ ')) { 
                            const e = message.content.indexOf('@') - 1;
                            message.member.setNickname(message.content.slice(4, e));
                            await message.member.roles.add(message.mentions.roles);
                            await message.member.roles.add(guildroles.find(role => role.name === 'Репетитор'));
                        }
                        await message.delete();
                    })
                    .catch(console.error);
                message.delete();
            }
        }
    if (message.content.startsWith('!help')) {
            if (message.channel.name === 'команды-боту'  || message.channel.name === 'бот') {
                message.channel.send("```!addrole\n!removerole\n!боньк```");
                
            } 
    }
    if (message.content.startsWith('!addrole')) {
            if (message.channel.name === 'команды-боту'  || message.channel.name === 'бот') {
                const user = message.mentions.users.first();
                if (user) {
                    const member = message.guild.member(user);
                    if (member) {
                        member.roles.add(message.mentions.roles);
                    } else {
                        message.reply('На сервере нет такого пользователя');
                    }
                } else {
                    message.reply('И кому я должен дать роль?');
                }
            } 
    }
    if (message.content.startsWith('!removerole')) {
       if (message.channel.name === 'команды-боту' || message.channel.name === 'бот') {
                const user = message.mentions.users.first();
                if (user) {
                    const member = message.guild.member(user);
                    if (member) {
                        member.roles.remove(message.mentions.roles);
                    } else {
                        message.reply('На сервере нет такого пользователя');
                    }
                } else {
                    message.reply('А роли кого лишить?');
                }
            }
    }
    if (message.content.startsWith('!Боньк') || message.content.startsWith('!боньк')) {
        if (message.guild) {
            if (message.member.roles.cache.some(role => (role.name === 'Модератор')||(role.name === 'Староста')||(role.name === 'Зам. старосты'))){
                
                const user = message.mentions.users.first();
                if (user) {
                    const member = message.guild.member(user);
                    if (member) {
                        member.voice.kick('Боньк)))');
                        message.channel.send(`${member}, Боньк)))`);
                    } else {
                        message.reply('На сервере нет такого пользователя');
                    }
                } else {
                    message.reply('А кого бонькать-то?');
                }
            } else {
                const attachment = new MessageAttachment('https://pm1.narvii.com/7090/6d8a103cbb6f5f916a925df3279616566fa32106r1-768-1024v2_uhq.jpg');
                message.reply('Ха-ха', attachment);
                message.member.voice.kick('Боньк)))');
            }
        }
    }
    if (message.content.startsWith('!clear')) {
        if (message.channel.name === 'команды-боту' || message.channel.name === 'бот') {
            var n = parseInt(message.content.substring(6), 10);
            message.channel.bulkDelete(n);
        }
    }
}

client.login(process.env.BOT_TOKEN);
