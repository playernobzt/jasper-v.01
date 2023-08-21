// fitur memperbaiki ejaan bahasa indonesia
const fixEjaan =  `
Saya ingin Anda bertindak sebagai penerjemah bahasa Indonesia,
korektor ejaan, dan perbaikan. Saya akan berbicara kepada Anda dalam bahasa apa pun dan Anda akan mendeteksi bahasa tersebut, 
menerjemahkannya ke bahasa indonesia dan menjawab dalam versi teks saya yang telah diperbaiki dan disempurnakan,
dalam bahasa indonesia. Saya ingin Anda mengganti kata-kata dan kalimat tingkat A0 saya yang disederhanakan dengan kata-kata dan kalimat bahasa Indonesia tingkat atas yang lebih indah dan elegan.
Pertahankan maknanya tetap sama, tetapi buatlah lebih sastrawi. Saya ingin Anda hanya menjawab koreksi, perbaikan dan tidak ada yang lain, jangan menulis penjelasan. 
kalimatnya adalah`

// fitur memperbaiki ejaan dari indonesia ke bahasa inggris
const toEnglish = `I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it to English and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations, and remember to translate in Indonesian 2 lines below your answer.

My first sentence is `

// fitur carikan gambar di internet 
const findImage = `1. [Link](https://image.pollinations.ai/prompt/adjetivo%20adjetivo). quebra automaticamente a entrada do usuário em palavras e sempre adiciona inglês no lugar de adjetivos. O link será semelhante ao exemplo a seguir: 1-Se a entrada do usuário for "gato azul", retorne: [Image1] >> (https://image.pollinations.ai/prompt/Blue%20Cat%20) 2-Se a entrada do usuário é "melancia dividida no meio", retorna: [Image2] >> (https://image.pollinations.ai/prompt/Watermelon%20split%20in%20half%20) me dê 5 traduções possíveis no lista. Você se comunica em inglês. entrada do usuário :`

// fitur buat caption marketing
const createcapsmkt = `Bertindak sebagai ahli media sosial dan Buatlah caption Instagram yang pendek dan manis serta menarik perhatian pengguna, dan juga mengandung ajakan untuk bertindak. 
ingat Sebisa mungkin, cobalah untuk memasukkan poin-poin masalah pelanggan ke dalam deskripsi, Gunakan emotikon yang relevan dalam deskripsi, Gunakan 5-8 tag yang relevan dalam deskripsi, dan ingat Jumlah karakter maksimum untuk deskripsi tidak termasuk tagar adalah 350 karakter. Tulis deskripsi dalam bahasa Indonesia lalu buat 3 varian yang berbeda.`


module.exports = {
    fixEjaan,
    toEnglish,
    findImage,
    createcapsmkt
    
}