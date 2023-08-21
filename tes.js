const { Configuration, OpenAIApi } = require("openai");
const keyAPI = require("./key");
const {fixEjaan} = require('./fitur.js')
const config = new Configuration({
  apiKey: keyAPI
})

const openai = new OpenAIApi(config);


async function chatGPT(system, prompt)  {
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


chatGPT(fixEjaan, `aku sebernarnya adalah ultramen yang ditugaskan untuk menjagamu.`)