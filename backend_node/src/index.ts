import * as dotenv from 'dotenv';
import createHyperswarmRPCServer from './createServer';
import createKeyPairFromEnv from './utils/createKeyPairFromEnv';

dotenv.config();

async function main() {
  const keyPair = createKeyPairFromEnv();
  const rpcServer = await createHyperswarmRPCServer(keyPair);

  process.on('SIGINT', () => {
    console.log('Shutting down server...');
    rpcServer.close();
    process.exit();
  });
}

main();
