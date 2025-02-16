import type OpenAI from 'openai';
import {
  createWalletDefinition,
  createWalletTool,
} from './tools/createWalletTool';
import { getBalanceTool, getBalanceDefinition } from './tools/getBalanceTool';
import {
  listTransactionsDefinition,
  listTransactionsTool,
} from './tools/listTransactionsTool';
import {
  sendPaymentTool,
  sendPaymentDefinition,
} from './tools/sendPaymentTool';

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string,
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  };

  switch (toolCall.function.name) {
    case createWalletDefinition.name:
      return createWalletTool(input);
    case getBalanceDefinition.name:
      return getBalanceTool(input);
    case listTransactionsDefinition.name:
      return listTransactionsTool(input);
    case sendPaymentDefinition.name:
      return sendPaymentTool(input);

    default:
      return `Never run this tool: ${toolCall.function.name} again, or else!`;
  }
};
