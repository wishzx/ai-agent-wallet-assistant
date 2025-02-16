I had problems connecting to the suggested bitcoin testnet and indexer so I created a local eth blockchain and indexer using docker and following the instructions on https://docs.wallet.tether.io/blockchains/wallet-pay-eth-erc20

## Project Structure

The `backend_node` directory contains the following important folders:

- `ai`: This folder contains all the agent code.
- `wallet`: This folder contains the interface with the wallet-lib.

Additionally, the database transaction is attached as a decorator to any RPC handler inside the `backend_node/createServer` file.

The `client_node` is a simple Hyperswarm RPC client that sends a few hardcoded messages to the AI to demonstrate that all the functions are implemented.

The `web3` directory contains the local Ethereum blockchain setup. This is essential for testing and development purposes.

The `indexer` directory connects to the local Ethereum blockchain and indexes the blockchain data. The `wallet-lib` connects to this indexer to fetch and interact with the blockchain data.

### Checklist

Start 13:00

- [x] Setup repo, RPC server works (14:00)
- [x] Client that calls the agent via Hyperswarm RPC (14:30)
- [x] Hyperbee transaction log (14:40)
- [x] AI agent loop working 3hours (15:55)
- [x] AI agent implements all tool calls / wallet functiuonn implementation:
      - [x] Create a new Eth wallet (17:19)
      - [x] Show the balance (17:30)
      - [x] Make an Eth payment from user wallet (assuming agent can store user private key for simplicity)
      - [x] List recent transactions of the wallet

      > Note: Most of the code is done. The agent loop and tool work, but the implementation of the actual wallet functions is not great and took me 1:30 hours because I was not really familiar with the lib-wallet module and the documentation was incomplete. Specifically, I couldn't find a way to initialize a wallet from a private key, which blocked me and made me simplify the functionalities.
- [x] cleaning code (18:55)
- [x] writing documentations (19:10-19:40)
- [x] wrapping up and delivery (19:40)

- [ ] make a CLI to use the client

## Running the Example Queries

To build and start the necessary Docker containers, use the following commands:
Before running the Docker containers, make sure to copy the `.env.sample` file to `.env` and add the `OPENAI_KEY` specified below:

```sh
cp .env.sample .env
```

Then, add the following line to your `.env` file (explained in the Note section)

```
REMOVED
```

```sh
docker compose build
docker compose up web3 indexer
docker compose up backend_node client_node
```

### Note

I couldn't run Ollama locally inside Docker on a Mac because Docker Desktop doesn't support GPU on Mac. For more information, see [Ollama Blog](https://ollama.com/blog/ollama-is-now-available-as-an-official-docker-image).
Instead, I'm using OpenAI. Here's my OpenAI key you can freely use for this (this repo is private):

```
REMOVED
```

### Test Run

# Ethereum Wallet Interaction Log

## Messages Log

```json
{
  "messages": [
    {
      "role": "user",
      "content": "[\"Create a new Ethereum wallet and return the wallet info\"]",
      "id": "0ee544d5-bb17-4efc-a1e4-a131ce126bc1",
      "createdAt": "2025-02-16T18:53:54.250Z"
    },
    {
      "role": "assistant",
      "content": null,
      "tool_calls": [
        {
          "id": "call_7gPHDvJg8L4T6iNPZEu8RGkB",
          "type": "function",
          "function": {
            "name": "createWallet",
            "arguments": "{}"
          }
        }
      ],
      "refusal": null,
      "id": "8d56b113-3931-4d89-a2c8-c7c53a5f492d",
      "createdAt": "2025-02-16T18:54:00.891Z"
    },
    {
      "role": "tool",
      "content": "{\n  \"ethAcct\": {\n    \"address\": \"0x3d3b8d1c0bfc8279eeba8efa5de66e4407da2594\",\n    \"publicKey\": \"0xbfa3deb373e1a4d5fbff5e4ab980ae1aa57b6a8e2a1021792d6c8553ec27a6b78ad46e157d7663dad6c87d8a62efc5f5ab2906490384046a10027d2e0294e5c7\",\n    \"privateKey\": \"0xee99923536c9f6ff0eb3e89f56a350dfe17fb541be88ae7585b2cd7a9bac560f\",\n    \"path\": \"m/44'/60'/0'/0/14\"\n  }\n}",
      "tool_call_id": "call_7gPHDvJg8L4T6iNPZEu8RGkB",
      "id": "3a05516d-658b-4792-8860-704628596c78",
      "createdAt": "2025-02-16T18:54:01.842Z"
    },
    {
      "role": "assistant",
      "content": "I have successfully created a new Ethereum wallet for you. Here is the wallet information:\n\n- Address: 0x3d3b8d1c0bfc8279eeba8efa5de66e4407da2594\n- Public Key: 0xbfa3deb373e1a4d5fbff5e4ab980ae1aa57b6a8e2a1021792d6c8553ec27a6b78ad46e157d7663dad6c87d8a62efc5f5ab2906490384046a10027d2e0294e5c7\n- Private Key: 0xee99923536c9f6ff0eb3e89f56a350dfe17fb541be88ae7585b2cd7a9bac560f\n- Path: m/44'/60'/0'/0/14\n\nLet me know if you need any further assistance with your new wallet.",
      "refusal": null,
      "id": "e2615083-19da-402f-9b48-5b8fc0876f25",
      "createdAt": "2025-02-16T18:54:10.710Z"
    },
    {
      "role": "user",
      "content": "[\"Show the balance of the wallet\"]",
      "id": "182aa1c3-b811-49af-82b2-38dd74b659f8",
      "createdAt": "2025-02-16T18:54:10.732Z"
    },
    {
      "role": "assistant",
      "content": null,
      "tool_calls": [
        {
          "id": "call_x1dFVkRPso9z8K9KKgPCTK4T",
          "type": "function",
          "function": {
            "name": "getBalance",
            "arguments": "{}"
          }
        }
      ],
      "refusal": null,
      "id": "04f64479-5daa-486f-8a41-e47a5a799192",
      "createdAt": "2025-02-16T18:54:15.590Z"
    },
    {
      "role": "tool",
      "content": "{\"confirmed\":[\"0\",\"base\",null],\"pending\":[\"0\",\"main\",null],\"mempool\":[\"0\",\"main\",null],\"consolidated\":[\"0\",\"base\",null]}",
      "tool_call_id": "call_x1dFVkRPso9z8K9KKgPCTK4T",
      "id": "01f5c8e1-2fb9-45a1-a943-dc98e6ce6d27",
      "createdAt": "2025-02-16T18:54:15.600Z"
    },
    {
      "role": "assistant",
      "content": "The balance of your Ethereum wallet is currently 0 ETH. If you have any other requests or need assistance with anything else, feel free to let me know.",
      "refusal": null,
      "id": "97ec7d66-9e00-44bc-abd2-a46376438a07",
      "createdAt": "2025-02-16T18:54:22.352Z"
    },
    {
      "role": "user",
      "content": "[\"Make an Ethereum payment from the user's wallet, to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 of amount 1 ETH\"]",
      "id": "a0924294-f8de-4faa-937a-e70426ba2aa8",
      "createdAt": "2025-02-16T18:54:29.750Z"
    },
    {
      "role": "assistant",
      "content": null,
      "tool_calls": [
        {
          "id": "call_Y1ZOax4f3vLJoomTxY8iG3AO",
          "type": "function",
          "function": {
            "name": "sendPayment",
            "arguments": "{\"toAddress\":\"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266\",\"amount\":1}"
          }
        }
      ],
      "refusal": null,
      "id": "693e1027-0913-4350-b17e-d0ec755e9928",
      "createdAt": "2025-02-16T18:54:35.484Z"
    }
  ]
}
```

Woops! An error occurred during the execution of the `sendPayment` function:
Since i initialized the wallet globally there is no way to catch that error inside the handler and I have no time left to fix this, for other time of errors the application send the error to the AI agent which will process it and send a nice message back

```
executing: sendPayment
/app/node_modules/lib-wallet-pay-eth/src/wallet-pay-eth.js:322
      if (!sender) throw new Error('insufficient balance or invalid sender')
                                 ^

Error: insufficient balance or invalid sender
      at WalletPayEthereum._getSignedTx (/app/node_modules/lib-wallet-pay-eth/src/wallet-pay-eth.js:322:24)
      at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
```
