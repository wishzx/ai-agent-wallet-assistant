import { getBalanceDefinition } from './getBalanceTool';
import { createWalletDefinition } from './createWalletTool';
import { sendPaymentDefinition } from './sendPaymentTool';
import { listTransactionsDefinition } from './listTransactionsTool';

export const tools = [
  createWalletDefinition,
  getBalanceDefinition,
  sendPaymentDefinition,
  listTransactionsDefinition,
];
