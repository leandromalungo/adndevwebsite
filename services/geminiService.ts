"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { CareerType } from "@/data/types";

export const getPersonalizedAdvice = async (
  career: CareerType,
  answers: string[]
): Promise<string> => {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    console.error("API_KEY do Google Generative AI não encontrada!");
    return "Não foi possível gerar o conselho personalizado, mas você tem um perfil promissor!";
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    O usuário realizou um teste de carreira em tecnologia e o resultado foi: ${career}.
    Baseado nas seguintes respostas dadas durante o quiz:
    ${answers.join("\n")}
    
    Escreva um parágrafo curto (máximo 400 caracteres) e motivador explicando por que este perfil combina com ele. 
    Use um tom amigável, profissional e inspirador. Não use jargões excessivos. Responda em Português do Brasil.
  `;

  try {
    // Timeout manual de 10 segundos caso a API demore
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    const result = await model.generateContent(prompt, { signal: controller.signal });
    clearTimeout(timeout);

    const response = await result.response;
    return response.text() || "Parabéns! Você tem um perfil promissor para esta área de tecnologia.";
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.error("Tempo limite excedido ao acessar o Gemini.");
      return "Estamos com dificuldades para acessar o serviço de aconselhamento, mas você tem um perfil muito promissor!";
    }
    console.error("Erro ao obter conselho do Gemini:", error);
    return "Você demonstrou habilidades analíticas e criativas que são fundamentais para o sucesso nesta trilha tecnológica!";
  }
};
