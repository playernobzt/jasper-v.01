const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});
 

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

// Pangge OpenAI GPT code
const { Configuration, OpenAIApi } = require("openai")

const config = new Configuration({
  apiKey: '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'
})

const openai = new OpenAIApi(config);
//----------------------------------------
async function chatGPT(prompt) {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 2048,
      temperature: 1,
    });
    return response.data.choices[0].message.content;
  }
  
//---------------------------------------------------------
//             Dibawah ini Variabel Unik 
const createimg = '1. [Link](https://image.pollinations.ai/prompt/adjetivo%20adjetivo).\nno automático quebre a entrada do usuário em palavras e as adicione sempre em inglês no lugar dos adjetivos.\nOs links devem ser semelhantes a este exemplo:\n1-Se a entrada do usuário for "gato azul" retorne: [Variation 1] >> (https://image.pollinations.ai/prompt/Blue%20Cat%20)\n 2-Se a entrada do usuário for "melancia partida no meio"  retorne: [Variation 2] >> (https://image.pollinations.ai/prompt/Watermelon%20split%20in%20half%20)\nme de 10 retornos de possiveis traduçoes em lista.\nvocê se comunica em English.\nEntrada do usuario '





//-------------------------------------------------
// fungsi chat dimulai
client.on('message', async message => {
    
   if (message.type === 'chat' && !message.id.fromMe) {
    try {
        // dapatkan nomor hape
        const senderName = message.notifyName
        const senderNumber = message.from;
        let incomingMessages = message.body;
        incomingMessages = incomingMessages.toLowerCase();
        const reaction = '👌'; // Anda bisa mengganti ini dengan emoji reaksi yang diinginkan

        // dapatkan info dari grup atau bukan
        // pesan menyebut bot atau tidak
        const isMessagesFromGroup = senderNumber.includes('@g.us');
        const isMessageMentionBot = incomingMessages.includes('@6289653704834')

        // tampilkan di console
        console.log('Nama: ', senderName)
        console.log('Pengirim: ', senderNumber);
        console.log('isi Pesan: ', incomingMessages);

        // tampilkan menyebut bot dan dari grup true atau false
        console.log('Apakah pesan dari Grup ? : ', isMessagesFromGroup);
        console.log('Apakah pesan mention bot ? : ', isMessageMentionBot);


        //------------------------------------------------------------


        // Jika pesan japri *****
        if(!isMessagesFromGroup){
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
            
        }

        //-----------------------------------------------------
        
        // Jika pesan Grup *****
        if(isMessagesFromGroup && isMessageMentionBot){
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
            
        }

        //-----------------------------------------------------
        

    }catch(error){console.log(error)}



   }
    
});
 

client.initialize();
 