import type { AIMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';

export type MessageWithMetadata = AIMessage & {
  id: string;
  createdAt: string;
};

type Data = {
  messages: MessageWithMetadata[];
};

// In-memory storage
const memoryDb: Data = {
  messages: [],
};

// Add metadata to messages
export const addMetadata = (message: AIMessage): MessageWithMetadata => ({
  ...message,
  id: uuidv4(),
  createdAt: new Date().toISOString(),
});

// Remove metadata before returning
export const removeMetadata = (message: MessageWithMetadata): AIMessage => {
  const { id, createdAt, ...rest } = message;
  return rest;
};

// Log current state
const logMessages = () => {
  console.log('Current Messages:', JSON.stringify(memoryDb.messages, null, 2));
};

// Add messages to memory
export const addMessages = (messages: AIMessage[]) => {
  memoryDb.messages.push(...messages.map(addMetadata));
  logMessages();
};

// Get messages from memory
export const getMessages = (): AIMessage[] => {
  return memoryDb.messages.map(removeMetadata);
};

// Save tool response
export const saveToolResponse = (toolCallId: string, toolResponse: string) => {
  return addMessages([
    {
      role: 'tool',
      content: toolResponse || 'No response available.',
      tool_call_id: toolCallId || '',
    },
  ]);
};
