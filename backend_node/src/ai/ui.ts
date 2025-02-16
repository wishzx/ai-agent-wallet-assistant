import type { AIMessage } from '../types';

export const logMessage = (message: AIMessage) => {
  const roleColors = {
    user: '\x1b[36m', // cyan
    assistant: '\x1b[32m', // green
  };

  const reset = '\x1b[0m';
  const role = message.role;
  const color = roleColors[role as keyof typeof roleColors] || '\x1b[37m'; // default to white

  // Don't log tool messages
  if (role === 'tool') {
    return;
  }

  // Log user messages (only have content)
  if (role === 'user') {
    console.log(`\n${color}[USER]${reset}`);
    console.log(`${message.content}\n`);
    return;
  }

  // Log assistant messages
  if (role === 'assistant') {
    // If has tool_calls, log function name
    if ('tool_calls' in message && message.tool_calls) {
      message.tool_calls.forEach((tool) => {
        console.log(`\n${color}[ASSISTANT]${reset}`);
        console.log(`${tool.function.name}\n`);
      });
      return;
    }

    // If has content, log it
    if (message.content) {
      console.log(`\n${color}[ASSISTANT]${reset}`);
      console.log(`${message.content}\n`);
    }
  }
};
