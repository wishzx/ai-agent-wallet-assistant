import type { ToolFn } from '../../types';
import { z } from 'zod';
import { listTransactions } from '../../wallet/wallet';

export const listTransactionsDefinition = {
  name: 'listTransactions',
  parameters: z.object({}),
  description: 'list all transactions',
};

type ListTransactionsArgs = z.infer<
  typeof listTransactionsDefinition.parameters
>;
export const listTransactionsTool: ToolFn<
  ListTransactionsArgs,
  string
> = async () => {
  try {
    const transactions = await listTransactions();
    return JSON.stringify(transactions, null, 2);
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
};
