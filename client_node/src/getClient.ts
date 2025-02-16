import HyperswarmRPC from '@hyperswarm/rpc'

const getHyperSwarmRPCClient = async (publicKey) => {
  const rpc = new HyperswarmRPC()
  const client = rpc.connect(publicKey)

  return client
}

export default getHyperSwarmRPCClient
