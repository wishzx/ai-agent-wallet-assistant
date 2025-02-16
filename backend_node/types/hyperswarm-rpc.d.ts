declare module '@hyperswarm/rpc' {
  import { EventEmitter } from 'events';
  import { DHT } from 'hyperdht';
  import { Duplex } from 'stream';
  import ProtomuxRPC from 'protomux-rpc';

  type Encoding = any;

  interface RPCOptions {
    valueEncoding?: Encoding;
    seed?: Buffer;
    keyPair?: { publicKey: Buffer; secretKey: Buffer };
    bootstrap?: string[];
    debug?: boolean;
    dht?: DHT;
    poolLinger?: number;
  }

  interface RequestOptions {
    valueEncoding?: Encoding;
    requestEncoding?: Encoding;
    responseEncoding?: Encoding;
  }

  class Client extends EventEmitter {
    constructor(
      dht: DHT,
      defaultValueEncoding: Encoding,
      publicKey: Buffer,
      options?: any,
    );

    readonly dht: DHT;
    readonly rpc: ProtomuxRPC;
    readonly closed: boolean;
    readonly mux: any;
    readonly stream: Duplex;

    request(
      method: string,
      value: Buffer,
      options?: RequestOptions,
    ): Promise<Buffer>;
    event(method: string, value: Buffer, options?: RequestOptions): void;
    end(): Promise<void>;
    destroy(err?: Error): void;
  }

  class Server extends EventEmitter {
    constructor(
      dht: DHT,
      defaultKeyPair: { publicKey: Buffer; secretKey: Buffer },
      defaultValueEncoding: Encoding,
      options?: any,
    );

    readonly dht: DHT;
    readonly publicKey: Buffer;
    readonly closed: boolean;
    readonly connections: Set<Client>;

    listen(keyPair?: { publicKey: Buffer; secretKey: Buffer }): Promise<void>;
    close(): Promise<void>;

    respond(
      method: string,
      options: RequestOptions,
      handler: (req: Buffer, rpc: Client) => Buffer | Promise<Buffer>,
    ): this;
    unrespond(method: string): this;
    address(): { host: string; port?: number; publicKey: Buffer };
  }

  class HyperswarmRPC {
    constructor(options?: RPCOptions);

    readonly dht: DHT;
    readonly defaultKeyPair: { publicKey: Buffer; secretKey: Buffer };

    createServer(options?: any): Server;
    request(
      publicKey: Buffer,
      method: string,
      value: Buffer,
      options?: RequestOptions,
    ): Promise<Buffer>;
    event(
      publicKey: Buffer,
      method: string,
      value: Buffer,
      options?: RequestOptions,
    ): void;
    connect(publicKey: Buffer, options?: any): Client;
    destroy(options?: { force?: boolean }): Promise<void>;
  }

  export = HyperswarmRPC;
}
