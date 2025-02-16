//import { processMessage } from '../aiAgent';

import { runAgent } from '../ai/agent';
import { tools } from '../ai/tools';

const interactWithAgent = async (req: Buffer): Promise<Buffer> => {
  try {
    const userMessage = req.toString();
    const response = await runAgent({ userMessage, tools });
    return Buffer.from(JSON.stringify(response));
  } catch (error) {
    return Buffer.from(
      JSON.stringify({ success: false, error: error.message }),
    );
  }
};

export default interactWithAgent;
