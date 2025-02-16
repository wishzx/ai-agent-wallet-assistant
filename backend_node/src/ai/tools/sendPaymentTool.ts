import type { ToolFn } from '../../types';
import { z } from 'zod';
import { sendPayment } from '../../wallet/wallet';

export const sendPaymentDefinition = {
  name: 'sendPayment',
  parameters: z.object({
    toAddress: z.string(),
    amount: z.number(),
  }),
  description: 'send a payment to a specified address',
};

type SendPaymentArgs = z.infer<typeof sendPaymentDefinition.parameters>;

export const sendPaymentTool: ToolFn<SendPaymentArgs, string> = async ({
  toolArgs,
}) => {
  try {
    const { toAddress, amount } = toolArgs;
    const tx = await sendPayment(toAddress, amount);
    return JSON.stringify(tx, null, 2);
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : String(error)}`;
  }
};
