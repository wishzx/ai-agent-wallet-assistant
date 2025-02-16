import config from '../config';
import DHT from 'hyperdht';
import { createHash } from 'node:crypto';

type Key = Buffer<ArrayBufferLike> | Uint8Array<ArrayBufferLike>;

export type KeyPair = {
  publicKey: Key;
  secretKey: Key;
};

/**
 * Generates a key pair based on the topic provided in the environment configuration.
 * @throws {Error} If the topic is not set in the config.
 */
const createKeyPairFromEnv = (): KeyPair => {
  const topic: string | undefined = config.topic;

  if (!topic) {
    throw new Error(
      'No topic provided, please set the TOPIC environment variable',
    );
  }

  const digest: Buffer = createHash('sha256').update(topic).digest();
  const keyPair: KeyPair = DHT.keyPair(digest);

  return keyPair;
};

export default createKeyPairFromEnv;
