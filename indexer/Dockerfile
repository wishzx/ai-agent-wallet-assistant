FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
RUN git clone https://github.com/tetherto/lib-wallet-indexer.git .
COPY config.json ./config.json


# Install the dependencies
RUN npm install

# Expose the ports for WebSocket and JSON-RPC
EXPOSE 8181
EXPOSE 8008

# Define the command to run the application
CMD ["npm", "run", "start-hardhat"]