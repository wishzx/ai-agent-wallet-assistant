# ETH AI Agent

I'm building a simple AI agent that can perform ETH payments using the Wallet Development Kit (WDK), Hyperswarm RPC, and Hypercore/Hyperbee for storage.

I’m really excited about using peer-to-peer (P2P) technology like Hypercore, Hyperbee, and Hyperswarm RPC for this project. It allows decentralized, trustless data sharing and communication without relying on central servers. This means more privacy, better resilience, and true ownership of data. Building an AI agent on top of this stack shows how modern blockchain and P2P protocols can combine to create powerful, user-centric applications that are both scalable and secure.

## Features

### 💬 Natural Language Communication

The agent supports several wallet-related commands in human language, including:

- Creating a new ETH wallet
- Showing the wallet balance
- Making a ETH payment from the user’s wallet (assuming the agent has access to the private key)
- Listing recent transactions

I'm using [WDK](https://docs.wallet.tether.io/) and the [Ethereum wallet guide](https://docs.wallet.tether.io/blockchains/wallet-pay-eth-erc20) to handle the wallet operations.

## Project Structure

The `backend_node` directory contains the following important folders:

- `ai`: This folder contains all the agent code.
- `wallet`: This folder contains the interface with the wallet-lib.

Additionally, the database transaction is attached as a decorator to any RPC handler inside the `backend_node/createServer` file.

The `client_node` is a simple Hyperswarm RPC client that sends a few hardcoded messages to the AI to demonstrate that all the functions are implemented.

The `web3` directory contains the local Ethereum blockchain setup. This is essential for testing and development purposes.

The `indexer` directory connects to the local Ethereum blockchain and indexes the blockchain data. The `wallet-lib` connects to this indexer to fetch and interact with the blockchain data.

## References

- https://docs.wallet.tether.io/blockchains/wallet-pay-btc
- https://www.npmjs.com/package/@hyperswarm/rpc
- https://docs.pears.com/building-blocks/hyperbee
- https://docs.pears.com/building-blocks/hypercore
- https://docs.pears.com/building-blocks/hyperdht
- https://www.npmjs.com/package/hp-rpc-cli

## Running the Example Queries

To build and start the necessary Docker containers, use the following commands:
Before running the Docker containers, make sure to copy the `.env.sample` file to `.env` and add your `OPENAI_KEY`

```sh
cp .env.sample .env
```

```sh
docker compose build
docker compose up web3 indexer
docker compose up backend_node client_node
```

### Note

I couldn't run Ollama locally inside Docker on a Mac because Docker Desktop doesn't support GPU on Mac. For more information, see [Ollama Blog](https://ollama.com/blog/ollama-is-now-available-as-an-official-docker-image).

### Example Run

# Ethereum Wallet Interaction Log

## Messages Log

```

backend_node-1  | Current Messages: [
backend_node-1  |   {
backend_node-1  |     "role": "user",
backend_node-1  |     "content": "[\"Create a new Ethereum wallet and return the wallet info\"]",
backend_node-1  |     "id": "0ee544d5-bb17-4efc-a1e4-a131ce126bc1",
backend_node-1  |     "createdAt": "2025-02-16T18:53:54.250Z"
backend_node-1  |   },
backend_node-1  |   {
backend_node-1  |     "role": "assistant",
backend_node-1  |     "content": null,
backend_node-1  |     "tool_calls": [
backend_node-1  |       {
backend_node-1  |         "id": "call_7gPHDvJg8L4T6iNPZEu8RGkB",
backend_node-1  |         "type": "function",
backend_node-1  |         "function": {
backend_node-1  |           "name": "createWallet",
backend_node-1  |           "arguments": "{}"
backend_node-1  |         }
backend_node-1  |       }
backend_node-1  |     ],
backend_node-1  |     "refusal": null,
backend_node-1  |     "id": "8d56b113-3931-4d89-a2c8-c7c53a5f492d",
backend_node-1  |     "createdAt": "2025-02-16T18:54:00.891Z"
backend_node-1  |   },
backend_node-1  |   {
backend_node-1  |     "role": "tool",
backend_node-1  |     "content": "{\n  \"ethAcct\": {\n    \"address\": \"0x3d3b8d1c0bfc8279eeba8efa5de66e4407da2594\",\n    \"publicKey\": \"0xbfa3deb373e1a4d5fbff5e4ab980ae1aa57b6a8e2a1021792d6c8553ec27a6b78ad46e157d7663dad6c87d8a62efc5f5ab2906490384046a10027d2e0294e5c7\",\n    \"privateKey\": \"0xee99923536c9f6ff0eb3e89f56a350dfe17fb541be88ae7585b2cd7a9bac560f\",\n    \"path\": \"m/44'/60'/0'/0/14\"\n  }\n}",
backend_node-1  |     "tool_call_id": "call_7gPHDvJg8L4T6iNPZEu8RGkB",
backend_node-1  |     "id": "3a05516d-658b-4792-8860-704628596c78",
backend_node-1  |     "createdAt": "2025-02-16T18:54:01.842Z"
backend_node-1  |   },
backend_node-1  |   {
backend_node-1  |     "role": "assistant",
backend_node-1  |     "content": "I have successfully created a new Ethereum wallet for you. Here is the wallet information:\n\n- Address: 0x3d3b8d1c0bfc8279eeba8efa5de66e4407da2594\n- Public Key: 0xbfa3deb373e1a4d5fbff5e4ab980ae1aa57b6a8e2a1021792d6c8553ec27a6b78ad46e157d7663dad6c87d8a62efc5f5ab2906490384046a10027d2e0294e5c7\n- Private Key: 0xee99923536c9f6ff0eb3e89f56a350dfe17fb541be88ae7585b2cd7a9bac560f\n- Path: m/44'/60'/0'/0/14\n\nLet me know if you need any further assistance with your new wallet.",
backend_node-1  |     "refusal": null,
backend_node-1  |     "id": "e2615083-19da-402f-9b48-5b8fc0876f25",
backend_node-1  |     "createdAt": "2025-02-16T18:54:10.710Z"
backend_node-1  |   },
backend_node-1  |   {
backend_node-1  |     "role": "user",
backend_node-1  |     "content": "[\"Show the balance of the wallet\"]",
backend_node-1  |     "id": "182aa1c3-b811-49af-82b2-38dd74b659f8",
backend_node-1  |     "createdAt": "2025-02-16T18:54:10.732Z"
backend_node-1  |   },
backend_node-1  |   {
backend_node-1  |     "role": "assistant",
backend_node-1  |     "content": null,
backend_node-1  |     "tool_calls": [
backend_node-1  |       {
backend_node-1  |         "id": "call_x1dFVkRPso9z8K9KKgPCTK4T",
backend_node-1  |         "type": "function",
backend_node-1  |         "function": {
backend_node-1  |           "name": "getBalance",
backend_node-1  |           "arguments": "{}"
backend_node-1  |         }
backend_node-1  |       }
backend_node-1  |     ],
backend_node-1  |     "refusal": null,
backend_node-1  |     "id": "04f64479-5daa-486f-8a41-e47a5a799192",
backend_node-1  |     "createdAt": "2025-02-16T18:54:15.590Z"
backend_node-1  |   },
backend_node-1  |   {
backend_node-1  |     "role": "tool",
backend_node-1  |     "content": "{\"confirmed\":[\"0\",\"base\",null],\"pending\":[\"0\",\"main\",null],\"mempool\":[\"0\",\"main\",null],\"consolidated\":[\"0\",\"base\",null]}",
backend_node-1  |     "tool_call_id": "call_x1dFVkRPso9z8K9KKgPCTK4T",
backend_node-1  |     "id": "01f5c8e1-2fb9-45a1-a943-dc98e6ce6d27",
backend_node-1  |     "createdAt": "2025-02-16T18:54:15.600Z"
backend_node-1  |   },
backend_node-1  |   {
backend_node-1  |     "role": "assistant",
backend_node-1  |     "content": "The balance of your Ethereum wallet is currently 0 ETH. If you have any other requests or need assistance with anything else, feel free to let me know.",
backend_node-1  |     "refusal": null,
backend_node-1  |     "id": "97ec7d66-9e00-44bc-abd2-a46376438a07",
backend_node-1  |     "createdAt": "2025-02-16T18:54:22.352Z"
backend_node-1  |   },
backend_node-1  |   {
backend_node-1  |     "role": "user",
backend_node-1  |     "content": "[\"Make an Ethereum payment from the user's wallet\"]",
backend_node-1  |     "id": "64b429b2-7d50-4cab-a29d-8fca5861a4ea",
backend_node-1  |     "createdAt": "2025-02-16T18:54:22.364Z"
backend_node-1  |   },
backend_node-1  |   {
backend_node-1  |     "role": "assistant",
backend_node-1  |     "content": "Sure, I can help you make an Ethereum payment from your wallet. Please provide me with the following details:\n1. Recipient's Ethereum address\n2. Amount of ETH to send\n\nOnce I have this information, I will proceed with the payment for you.",
backend_node-1  |     "refusal": null,
backend_node-1  |     "id": "90864196-eee0-4369-8c00-7d8998b4a4dc",
backend_node-1  |     "createdAt": "2025-02-16T18:54:29.741Z"
backend_node-1  |   },
backend_node-1  |   {
backend_node-1  |     "role": "user",
backend_node-1  |     "content": "[\"Make an Ethereum payment from the user's wallet, to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 of amount 1 ETH\"]",
backend_node-1  |     "id": "a0924294-f8de-4faa-937a-e70426ba2aa8",
backend_node-1  |     "createdAt": "2025-02-16T18:54:29.750Z"
backend_node-1  |   },
backend_node-1  |   {
backend_node-1  |     "role": "assistant",
backend_node-1  |     "content": null,
backend_node-1  |     "tool_calls": [
backend_node-1  |       {
backend_node-1  |         "id": "call_Y1ZOax4f3vLJoomTxY8iG3AO",
backend_node-1  |         "type": "function",
backend_node-1  |         "function": {
backend_node-1  |           "name": "sendPayment",
backend_node-1  |           "arguments": "{\"toAddress\":\"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266\",\"amount\":1}"
backend_node-1  |         }
backend_node-1  |       }
backend_node-1  |     ],
backend_node-1  |     "refusal": null,
backend_node-1  |     "id": "693e1027-0913-4350-b17e-d0ec755e9928",
backend_node-1  |     "createdAt": "2025-02-16T18:54:35.484Z"
backend_node-1  |   }
backend_node-1  | ]

```
