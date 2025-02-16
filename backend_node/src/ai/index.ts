import 'dotenv/config';
import { runAgent } from './agent';
import { tools } from './tools';

const userMessage = process.argv[2];

if (!userMessage) {
  console.error('Please provide a message');
  process.exit(1);
}
async function main() {
  await runAgent({ userMessage, tools });
}

main();
