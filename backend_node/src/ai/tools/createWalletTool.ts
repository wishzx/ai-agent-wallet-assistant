import type { ToolFn } from '../../types';
import { z } from 'zod';
import { createNewWallet } from '../../wallet/wallet';

export const createWalletDefinition = {
  name: 'createWallet',
  parameters: z.object({}),
  description: 'create a new wallet and return info about it',
};

type Args = z.infer<typeof createWalletDefinition.parameters>;

export const createWalletTool: ToolFn<Args, string> = async ({ toolArgs }) => {
  try {
    const ethAcct = await createNewWallet();
    return JSON.stringify(ethAcct, null, 2);
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
};
