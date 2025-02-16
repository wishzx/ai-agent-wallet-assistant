import dotenv from 'dotenv'
import getHyperSwarmRPCClient from './getClient'
import createKeyPairFromEnv from './utils/createKeyPairFromEnv'

dotenv.config()

const main = async () => {
  await new Promise((resolve) => setTimeout(resolve, 10000))
  const keyPair = createKeyPairFromEnv()
  const client = await getHyperSwarmRPCClient(keyPair.publicKey)

  client.once('open', async () => {
    await clientCallback(client)
  })

  client.once('error', (err) => {
    console.error('Failed to connect to server', err)
  })
}

const clientCallback = async (client) => {
  console.log('Client connected!')

  const createWalletResponse = await client.request(
    'interactWithAgent',
    Buffer.from(
      JSON.stringify([
        'Create a new Ethereum wallet and return the wallet info',
      ]),
    ),
  )
  console.log(
    'Create Wallet result:',
    JSON.parse(createWalletResponse.toString()),
  )

  const showBalanceResponse = await client.request(
    'interactWithAgent',
    Buffer.from(JSON.stringify(['Show the balance of the wallet'])),
  )
  console.log(
    'Show Balance result:',
    JSON.parse(showBalanceResponse.toString()),
  )

  console.log(
    'Trying to make a payment, this should ask me for more informations ',
  )
  const makePaymentResponse = await client.request(
    'interactWithAgent',
    Buffer.from(
      JSON.stringify(["Make an Ethereum payment from the user's wallet"]),
    ),
  )
  console.log(
    'Make Payment result:',
    JSON.parse(makePaymentResponse.toString()),
  )

  console.log(
    'Trying to make a payment, this will fail because I have no funds',
  )
  const makePaymentWithArgsResponse = await client.request(
    'interactWithAgent',
    Buffer.from(
      JSON.stringify([
        "Make an Ethereum payment from the user's wallet, to 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 of amount 1 ETH",
      ]),
    ),
  )
  console.log(
    'Make Payment result with address:',
    JSON.parse(makePaymentWithArgsResponse.toString()),
  )

  const listTransactionsResponse = await client.request(
    'interactWithAgent',
    Buffer.from(JSON.stringify(['List recent transactions of the wallet'])),
  )
  console.log(
    'List Transactions result:',
    JSON.parse(listTransactionsResponse.toString()),
  )

  await client.end()
  console.log('client disconnecting ')
}

main().catch(console.error)
