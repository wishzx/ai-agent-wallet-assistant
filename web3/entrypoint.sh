#!/bin/bash

# Start the Hardhat node in the background
npx hardhat node &

# Deploy a contract
npx hardhat run scripts/deploy.js --network localhost

ADDR=0x6122cfcd13692dfbe876e513109c5b653c4c2399 AMT=6 npx hardhat run ./scripts/erc-transfer.js --network localhost
ADDR=0x6122cfcd13692dfbe876e513109c5b653c4c2399 AMT=1 npx hardhat run ./scripts/eth-transfer.js --network localhost

# Keep the container running
tail -f /dev/null