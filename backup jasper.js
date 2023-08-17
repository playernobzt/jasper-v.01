

            
            axios.get("https://script.google.com/macros/s/AKfycbyytRW67KrqcQt7QA2QBZ8yb7AUODBat-FvOJhqNOlS5CIwCW0Fv_zyTU15i3EFuCA/exec?whatsapp="+numberHp)
            .then(async (response) => {
                const {succsess, data, info} = response.data
                if(succsess) {
                    const sisaToken = `${data.sisatoken}`;
                    if(sisaToken > 0){
                        setTimeout(function(){message.react(reaction);},1500)
            
                        if(incomingMessages.includes('hi.jasper')){
                            setTimeout(function(){message.reply('Hay \n\nperkenalkan saya adalah Asisten virtual yang diciptakan oleh seseorang yang gabut tidak memiliki goals dalam hidup dan saya malas dengan beliau, saya jijik menyebutkan namanya, silahkan anda cari aja dia di instagram @turisbelanda\n\nada yang bisa saya bantu ?')},3000)
                        }
                        else if (incomingMessages.includes('/create.img')){
                             async function runPrompt() {
                                 const result = await chatGPT(createimg + incomingMessages.replace('/create.img', ''));
                                 setTimeout(function(){message.reply(`${result}\n\n\nJangan lupa follow IG:@turisbelanda`);},3000)
                                 } runPrompt()
                        }
                        else {
                            const result = await chatGPT(incomingMessages)
                            setTimeout(function(){message.reply(result)},3000)
                        }
                    } else if( sisaToken < 0){
                        const fixToken = "Nol";
                        setTimeout(function(){message.reply('Maaf token anda: ', fixToken)},1000);
                        setTimeout(function(){message.react(reaction2)},3000);

                    }
                    
                     
                }
                else message.reply("Maaf nomor anda tidak terdaftar !!\nsilahkan menghubungi tuan saya")
            });
        
            