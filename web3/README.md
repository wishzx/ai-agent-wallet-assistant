# Web3 Docker Setup

This folder contains the necessary files to set up a Docker container for the Web3 project.

## Files

- `DockerFile`: The Docker configuration file.
- `entrypoint.sh`: The entry point script for the Docker container.
- `hardhat.config.js`: The Hardhat configuration file for the project.

## Usage

To perform more operations, you can modify `entrypoint.sh` or use the following command to open a terminal inside the Docker container:

```sh
docker compose exec -it web3 /bin/bash
```

\*This project is part of a larger setup that uses Docker Compose
