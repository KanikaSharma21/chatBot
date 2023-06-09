import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import {Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send({
    message: "Hello from qyuki",
  });
});

// app.post("/", async (req, res) => {
//   try {
//     const prompt = req.body.prompt;
    
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: `${prompt}`,
//       temperature: 0,
//       max_tokens: 3000,
//       top_p: 1,
//       frequency_penalty: 0.5,
//       presence_penalty: 0,
//     });
//     // console.log(response.data)
//     res.status(200).send({
//         bot:response.data.choices[0].text
//     })
//   } catch (error) {
//     console.log(error.response.data.error);
//     res.status(500).send({error})
//   }
// });

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
  
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: `${prompt}`}],
    });
    console.log(response.data.choices[0])
    res.status(200).send({
        bot:response.data.choices[0].message.content
    })
  } catch (error) {
    console.log(error.response);
    res.status(500).send({error})
  }
});

app.listen(5000,()=>console.log("listening on port 5000"))