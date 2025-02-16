import HyperswarmRPC from '@hyperswarm/rpc';
import handlers from './handlers';
import createHyperBeeDB from './createHyperBeeDB';
import { randomUUID } from 'node:crypto';

const createHyperswarmRPCServer = async (keyPair) => {
  try {
    const rpc = new HyperswarmRPC({
      keyPair: {
        publicKey: Buffer.from(keyPair.publicKey),
        secretKey: Buffer.from(keyPair.secretKey),
      },
    });
    const server = rpc.createServer();
    const hyperbeedb = await createHyperBeeDB();

    Object.entries(handlers).forEach(([method, handler]) => {
      server.respond(method, {}, async (request) => {
        const startTime = Date.now();
        const response = await handler(request);
        const endTime = Date.now();

        await hyperbeedb.put(randomUUID(), {
          method,
          request,
          response,
          timestamp: new Date().toISOString(),
          duration: endTime - startTime,
        });

        return response;
      });
      console.log(`Registered handler for method: ${method}`);
    });

    await server.listen();
    console.log('Server is listening...');

    return server;
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

export default createHyperswarmRPCServer;
