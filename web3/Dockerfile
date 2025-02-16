# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Clone the wallet-test-tools repo
RUN git clone https://github.com/tetherto/wallet-lib-test-tools.git .
COPY hardhat.config.js src/eth/hardhat.config.js


RUN npm install -g hardhat
RUN npm install


# Navigate to the eth directory
WORKDIR /app/src/eth

# Install the dependencies
RUN npm install
RUN mv erc20.config.json.example erc20.config.json


# Expose the port for Hardhat network
EXPOSE 8545

# Copy the entrypoint script
COPY entrypoint.sh .

# Make the entrypoint script executable
RUN chmod +x entrypoint.sh

# Set the entrypoint to the script
ENTRYPOINT ["./entrypoint.sh"]