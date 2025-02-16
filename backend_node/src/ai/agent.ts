import type { AIMessage } from '../types';
import { addMessages, getMessages, saveToolResponse } from './memory';
import { runLLM } from './llm';
import { logMessage } from './ui';
import { runTool } from './toolRunner';

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string;
  tools: any[];
}) => {
  try {
    addMessages([{ role: 'user', content: userMessage }]);

    while (true) {
      const history = getMessages();
      const response = await runLLM({ messages: history, tools });

      addMessages([response]);

      if (response.content) {
        logMessage(response);
        return getMessages();
      }

      if (response.tool_calls) {
        const toolCall = response.tool_calls[0];
        logMessage(response);
        console.log(`executing: ${toolCall.function.name}`);

        const toolResponse = await runTool(toolCall, userMessage);
        saveToolResponse(toolCall.id, toolResponse);
        console.log(`done: ${toolCall.function.name}`);
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
