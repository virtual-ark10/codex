import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import {OpenAI} from 'openai';

dotenv.config();

/* const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
}) */

const configuration = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    
  })
  

const openai = new OpenAI(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    res.status(200).send({
        message: 'Hello From CodeX Backend'
    })
});

app.post('/', async(req,res) => {
    try {
        const prompt = req.body.prompt;

        const response = await openai.chat.completions.create({
            model: "mistralai/mistral-7b-instruct:free",
            messages: [
            { role: "user", content: `${prompt}` }
            ],
        })

        const botResponse = response.choices[0].message
        //const keys = Object.keys(botResponse);
        /* keys.forEach(key => {
            console.log(`${key}:` , botResponse.content)
        }) */
        //console.log(botResponse[1]);
        res.status(200).send({
            
           bot: botResponse.content
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error});
    }

})

app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));



