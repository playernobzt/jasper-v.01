const { Configuration, OpenAIApi } = require("openai")

const config = new Configuration({
  apiKey: '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'
})

const openai = new OpenAIApi(config);


const createimg = '1. [Link](https://image.pollinations.ai/prompt/adjetivo%20adjetivo).\nno automático quebre a entrada do usuário em palavras e as adicione sempre em inglês no lugar dos adjetivos.\nOs links devem ser semelhantes a este exemplo:\n1-Se a entrada do usuário for "gato azul" retorne: [Variation 1] >> (https://image.pollinations.ai/prompt/Blue%20Cat%20)\n 2-Se a entrada do usuário for "melancia partida no meio"  retorne: [Variation 2] >> (https://image.pollinations.ai/prompt/Watermelon%20split%20in%20half%20)\nme de 10 retornos de possiveis traduçoes em lista.\nvocê se comunica em English.\nEntrada do usuario '





async function chatGPT(prompt, system) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role:"system", content: system},
      { role: "user", content: prompt }],
    max_tokens: 2048,
    temperature: 0.3,
  });
  console.log(response.data.choices[0].message.content);
}


chatGPT("Apa itu buku","Anda adalah teman baik saya jadi gunakan gaya bicara seperti teman baik")