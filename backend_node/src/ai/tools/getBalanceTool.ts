import type { ToolFn } from '../../types';
import { z } from 'zod';
import fetch from 'node-fetch';
import { getBalance } from '../../wallet/wallet';

export const getBalanceDefinition = {
  name: 'getBalance',
  parameters: z.object({}),
  description: 'get the balance of the wallet',
};
type Args = z.infer<typeof getBalanceDefinition.parameters>;
export const getBalanceTool: ToolFn<Args, string> = async ({ toolArgs }) => {
  try {
    const balance = await getBalance();
    return JSON.stringify(balance);
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
};
