// @ts-nocheck
import { Request, Response } from 'express';
import OpenAI from "openai";
const { OPEN_AI_KEY1, OPEN_AI_KEY2, OPEN_AI_KEY3, OPEN_AI_KEY4 } = require('../config/config');

export const handleQuery = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const prompt = `
        If the question isn't related to algebra or geometry , then provide the following sentence as response : "I'm sorry but I can only help with algebra and geometry questions." . Else , provide the answer to the question with explaination.
        Question: ${message}
        `
        try {
            const openai = new OpenAI({ apiKey: OPEN_AI_KEY1 });
            const gptResponse = await openai.completions.create({
                model: "gpt-3.5-turbo-instruct",
                prompt: prompt,
                max_tokens: 200,
                temperature: 0,
            });
            return res.status(200).json({ message: gptResponse.choices[0].text });

        } catch (e) {
            try {
                const openai = new OpenAI({ apiKey: OPEN_AI_KEY2 });
                const gptResponse = await openai.completions.create({
                    model: "gpt-3.5-turbo-instruct",
                    prompt: prompt,
                    max_tokens: 200,
                    temperature: 0,
                });
                return res.status(200).json({ message: gptResponse.choices[0].text });

            } catch (e) {
                try {
                    const openai = new OpenAI({ apiKey: OPEN_AI_KEY3 });
                    const gptResponse = await openai.completions.create({
                        model: "gpt-3.5-turbo-instruct",
                        prompt: prompt,
                        max_tokens: 200,
                        temperature: 0,
                    });
                    return res.status(200).json({ message: gptResponse.choices[0].text });

                } catch (e) {
                    const openai = new OpenAI({ apiKey: OPEN_AI_KEY4 });
                    const gptResponse = await openai.completions.create({
                        model: "gpt-3.5-turbo-instruct",
                        prompt: prompt,
                        max_tokens: 200,
                        temperature: 0,
                    });
                    return res.status(200).json({ message: gptResponse.choices[0].text });

                }
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}
