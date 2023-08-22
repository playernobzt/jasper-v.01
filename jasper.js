const qrcode = require('qrcode-terminal');
const axios = require('axios')
const keyAPI = require('./key.js')
const petunjukToken = 'Untuk mendapatkan token, Anda hanya perlu memberikan sedikit *DONASI*, dan kami akan memberikan token kepada Anda  *10x* lipat dari jumlah donasi yang Anda berikan.\n\nPetunjuk donasi:\n1. Buka tautan donasi di bio kami.\n2. Pilih jumlah donasi.\n3. Isi data diri, termasuk email.\n4. Cantumkan Nomor WhatsApp Anda. Pada kolom *PESAN*\n5. Pilih metode pembayaran dan bayar.\n\nIngat no.WA harus berawalan *62*\ncontoh : 6289532xxxxx\n*Bukan : 089532xxxxx*\n\nLihat contoh pada gambar diatas!!'




const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
		args: ['--no-sandbox'],
	}
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
  apiKey: keyAPI
})

const openai = new OpenAIApi(config);
//----------------------------------------
async function chatGPT(system, prompt) {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: prompt },
        { role:"system", content: system}
    ],
      max_tokens: 2048,
      temperature: 0.3,
    });

  const generatedText = response.data.choices[0].message.content;
  const totalTokens = response.data.usage.total_tokens;

  return { generatedText, totalTokens };
    
  }
  
//---------------------------------------------------------
//             Dibawah ini Variabel Unik 
const { 
    fixEjaan,
    toEnglish,
    findImage,
    createcapsmkt

} = require('./fitur.js')



//-------------------------------------------------
// fungsi chat dimulai
client.on('message', async message => {
    
   if (message.type === 'chat' && !message.id.fromMe) {
    try {
        // dapatkan nomor hape
        // const contact = await message.getContact(contact.pushname);
        const contact = await message.getContact()
        const senderName = contact.pushname
        const senderNumber = message.from;
        let incomingMessages = message.body;
        incomingMessages = incomingMessages.toLowerCase();
        const reaction = '👌'; // reaksi oke siap diterima
        const reaction2 = '😭'; // reaksi sedih 
        const reactionMengetik = '💬'

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
        //            Message config apa 
    
        

        // Jika pesan japri *****
        if(!isMessagesFromGroup){
            const update = "https://script.google.com/macros/s/AKfycbyiQ4AX4G7Pps6vML6VeYu-RqWeatSF518dMxF__cCKQ_gJlZZDY94LDTbEyxwJ9buG/exec?action=update-data&whatsapp="
            const cekdata = "https://script.google.com/macros/s/AKfycbyiQ4AX4G7Pps6vML6VeYu-RqWeatSF518dMxF__cCKQ_gJlZZDY94LDTbEyxwJ9buG/exec?action=cek-data&whatsapp="
            const register = "https://script.google.com/macros/s/AKfycbyiQ4AX4G7Pps6vML6VeYu-RqWeatSF518dMxF__cCKQ_gJlZZDY94LDTbEyxwJ9buG/exec?action=register&whatsapp="
            const numberHp = senderNumber.replace("@c.us", "")
            const rname = "&nama="
            const rtoken = "&token=5000"
            const regisChat  = incomingMessages.includes('#daftarkan.saya')
            const cekToken = incomingMessages.includes('#cek.token')
            const tambahToken = incomingMessages.includes('#tambah.token')
            const tokenDonasi = `&tokenDonasi==SUMIF(Donasi!A2:A;${numberHp};Donasi!B2:B)`
            const sisaToken = `&sisaToken==SUM((INDEX(D:D;MATCH(${numberHp};B:B;0)):(INDEX(E:E;MATCH(${numberHp};B:B;0)))))`


            

            if(incomingMessages.includes('#daftarkan.saya')){
                axios.get(register+numberHp+rname+senderName+rtoken+tokenDonasi+sisaToken)
                    .then (async (response) => {
                        message.react(reaction)
                        const {succsess, data, info} = response.data
                        if(succsess) {
                            message.reply(`Halo *${senderName}* \nTerimakasih telah mendaftar\n\nAda yang bisa saya bantu ? `)
                        } else if(!succsess) {
                            message.reply(info)
                        }
                    })
            }
            else if (cekToken) {
                axios.get(cekdata+numberHp)
                    .then(async (response) => {
                        message.react(reaction)
                        const {data, info} = response.data
                        if (data == null) {
                            message.reply("Maaf  anda tidak terdaftar, \nKetik : *#daftarkan.saya*\n\nuntuk mulai mendaftarkan anda pada \n*Gratis* !!")
                        }else if(data !== null) {
                            message.reply(`Sisa token anda : *${data.sisaToken}*`)
                        }
                    })
            }
            else if (tambahToken) {
                const media = MessageMedia.fromFilePath('./images/image.jpeg')
                const chat = message.getChat();
                (await chat).sendMessage(media, {caption: petunjukToken})
                
            }
            else if (!regisChat && !cekToken && !tambahToken) {
                axios.get(cekdata+numberHp)
                .then(async (response) => {

                    // Validasi  apakah dia ada di nomor terdaftar  dan masih memiliki token?
                    const {succsess, data, info} = response.data
                    
                    if(data == null) {
                        message.react(reaction2)
                        message.reply("Maaf  anda tidak terdaftar, \nKetik : *#daftarkan.saya*\n\nuntuk mulai mendaftarkan anda pada \n*Gratis* !!")
                    }
                    else if(data !== null && data.sisaToken < 0.1){
                        message.reply('Maaf token anda tidak cukup, silahkan melakukan pengisian token\n\nketik : *#tambah.token*\n\nuntuk tambah token anda')
                        setTimeout(function() {
                            message.react(reaction2);
                        }, 1000);
                    }
                    else if (data.sisaToken > 0) {
                            const newTokenlink = "&newToken=";
                            
                            try {
                                
                                // fitur fixejaan >> memperbaiki ejaan semua bahasa ke bahasa indonesia profesional
                                if (incomingMessages.includes('#fixejaan')){
                                    message.react(reactionMengetik);
                                    const result = await chatGPT('',    `${fixEjaan} ${incomingMessages.replace('#fixejaan','')}`);
                                    const updateToken = data.token - result.totalTokens;
                                    const sisaTokenSementara = updateToken + data.tokenDonasi;
                                    message.reply(result.generatedText + "\n\nPenggunaan token: " + `*${result.totalTokens}*` + `\nSisa token : *${sisaTokenSementara}*`);

                                    axios.get(update+numberHp+newTokenlink+updateToken+tokenDonasi+sisaToken)

                                }
                                // fitur fixejaan >> memperbaiki ejaan semua bahasa ke bahasa inggris profesional
                                else if ( incomingMessages.includes('#toenglish')){
                                    message.react(reactionMengetik);
                                    const result = await chatGPT(toEnglish, incomingMessages.replace('#toenglish',''));
                                    const updateToken = data.token - result.totalTokens;
                                    const sisaTokenSementara = updateToken + data.tokenDonasi;
                                    message.reply(result.generatedText + "\n\nPenggunaan token: " + `*${result.totalTokens}*` + `\nSisa token : *${sisaTokenSementara}*`);

                                    axios.get(update+numberHp+newTokenlink+updateToken+tokenDonasi+sisaToken)
                                }
                                else if ( incomingMessages.includes('#findimg')){
                                    message.react(reactionMengetik);
                                    const result = await chatGPT(findImage, incomingMessages.replace('#findimg',''));
                                    const updateToken = data.token - result.totalTokens;
                                    const sisaTokenSementara = updateToken + data.tokenDonasi;
                                    message.reply(result.generatedText + "\n\nPenggunaan token: " + `*${result.totalTokens}*` + `\nSisa token : *${sisaTokenSementara}*`);

                                    axios.get(update+numberHp+newTokenlink+updateToken+tokenDonasi+sisaToken)
                                }
                                else if ( incomingMessages.includes('#createcaps.mkt')){
                                    message.react(reactionMengetik);
                                    const deskripsicaption = incomingMessages.replace('#createcaps.mkt','')
                                    const result = await chatGPT('', `${createcapsmkt}Berikut adalah penjelasan untuk deskripsi yang perlu Anda buat berdasarkan penjelasan lengkap tentang postingan atau reel di Instagram, yaitu : ${deskripsicaption}`);
                                    const updateToken = data.token - result.totalTokens;
                                    const sisaTokenSementara = updateToken + data.tokenDonasi;
                                    message.reply(result.generatedText + "\n\nPenggunaan token: " + `*${result.totalTokens}*` + `\nSisa token : *${sisaTokenSementara}*`);

                                    axios.get(update+numberHp+newTokenlink+updateToken+tokenDonasi+sisaToken)
                                }
                                    
                                
                                else {
                                    message.react(reactionMengetik);
                                    const result = await chatGPT("", incomingMessages);
                                    const updateToken = data.token - result.totalTokens;
                                    const sisaTokenSementara = updateToken + data.tokenDonasi;
                                    message.reply(result.generatedText + "\n\nPenggunaan token: " + `*${result.totalTokens}*` + `\nSisa token : *${sisaTokenSementara}*`);

                                    axios.get(update+numberHp+newTokenlink+updateToken+tokenDonasi+sisaToken)
                                }



                                
                                
                                
                                    

                            } catch (error) {
                                console.error("Error:", error);
                                }
                    }
                    



                });  
            }
                
            

        }

        //-----------------------------------------------------
        
        // Jika pesan Grup *****
        if(isMessagesFromGroup && isMessageMentionBot){
            setTimeout(function(){message.react(reaction);},1500);
            
            
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
 
