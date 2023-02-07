const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-G6ZTJhAYojlCQ2JLtxeEV8lF",
    apiKey: "",//your CHATGPT key goes here!
});
const openai = new OpenAIApi(configuration);
const app = express()
const port = 3080// change if you want
app.use(bodyParser.json())
app.use(cors())

app.post('/', async (req, res) => {
    const {message} = req.body    
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 1000,
        temperature: 1.0,
      });      
      res.json({
        message: response.data.choices[0].text,
        })
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))