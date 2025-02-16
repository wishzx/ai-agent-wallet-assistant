import { createNewWallet } from '../wallet/wallet';

const createWalletHandler = async (req: Buffer): Promise<Buffer> => {
  try {
    const ethAcct = await createNewWallet();
    return Buffer.from(JSON.stringify(ethAcct));
  } catch (error) {
    return Buffer.from(
      JSON.stringify({ success: false, error: error.message }),
    );
  }
};

export default createWalletHandler;
