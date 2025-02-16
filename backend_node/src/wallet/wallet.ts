import Bip39 from 'wallet-seed-bip39';
import { WalletStoreHyperbee } from 'lib-wallet-store';
import { EthPay, Provider } from 'lib-wallet-pay-eth';
import { Wallet } from 'lib-wallet';

interface ProviderConfig {
  web3: string;
  indexer: string;
  indexerWs: string;
}

interface WalletConfig {
  store: WalletStoreHyperbee;
  seed: string;
  assets: EthPay[];
}

const providerConfig: ProviderConfig = {
  web3: 'http://localhost:8545/',
  indexer: 'http://localhost:8008/',
  indexerWs: 'ws://localhost:8181/',
};

const provider = new Provider(providerConfig);

const store = new WalletStoreHyperbee({ store_path: './db' });

let wallet: Wallet;

async function initialize(): Promise<string | void> {
  try {
    await store.init();
    await provider.init();

    const network = await provider.web3.eth.net.getId();
    console.log('Connected to network:', network);
  } catch (error) {
    console.error('Error initializing provider:', error);
    return `Error initializing provider: ${error.message}`;
  }
}

async function createNewWallet(): Promise<
  { ethAcct: { address: string } } | string
> {
  try {
    const seed: string = await Bip39.generate();
    await initialize();

    const ethPay = new EthPay({
      asset_name: 'eth',
      provider,
      network: 'sepolia',
    });

    const walletConfig: WalletConfig = {
      store,
      seed,
      assets: [ethPay],
    };

    wallet = new Wallet(walletConfig);

    await wallet.initialize();
    await wallet.syncHistory();
    const ethAcct = await wallet.pay.eth.getNewAddress();
    console.log('New ETH Account:', ethAcct);
    return { ethAcct };
  } catch (error) {
    console.error('Error creating new wallet:', error);
    return `Error creating new wallet: ${error.message}`;
  }
}

async function getBalance(): Promise<string> {
  try {
    const balance: string = await wallet.pay.eth.getBalance({});
    console.log('Balance:', balance);
    return balance;
  } catch (error) {
    console.error('Error getting balance:', error);
    return `Error getting balance: ${error.message}`;
  }
}

async function sendPayment(toAddress: string, amount: number): Promise<string> {
  try {
    const tx = await wallet.pay.eth.sendTransaction(
      {},
      {
        address: toAddress,
        amount,
        unit: 'base', // main = ETH and base = wei unit
      },
    );
    console.log('Transaction Hash:', tx.hash);
    return tx.hash;
  } catch (error) {
    console.error('Error sending payment:', error);
    return `Error sending payment: ${error.message}`;
  }
}

async function listTransactions(): Promise<any[] | string> {
  try {
    await wallet.pay.eth.syncTransactions({ reset: true });
    const transactions: any[] = [];
    await wallet.pay.eth.getTransactions((txs) => {
      transactions.push(txs);
      console.log('Transactions:', txs);
    });
    return transactions;
  } catch (error) {
    console.error('Error listing transactions:', error);
    return `Error listing transactions: ${error.message}`;
  }
}

export { createNewWallet, getBalance, sendPayment, listTransactions };
