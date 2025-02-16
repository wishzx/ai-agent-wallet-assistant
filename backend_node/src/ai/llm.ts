import type { AIMessage } from '../types';
import { openai } from './ai';
import { zodFunction } from 'openai/helpers/zod';
import { systemPrompt } from '../systemPrompt';

export const runLLM = async ({
  messages,
  tools,
}: {
  messages: AIMessage[];
  tools: any[];
}) => {
  try {
    const formattedTools = tools.map(zodFunction);

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      temperature: 0.1,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      tools: formattedTools,
      tool_choice: 'auto',
      parallel_tool_calls: false,
    });

    return response.choices[0].message;
  } catch (error) {
    console.error('Error running LLM:', error);
    throw error;
  }
};
