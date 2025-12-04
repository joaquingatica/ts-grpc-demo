# TypeScript Node.js gRPC Demo

This is a demo project to showcase a gRPC server and client for Node.js
with TypeScript.

## Features

- TypeScript for client and server:
  - `nice-grpc`([npm][nice-grpc-npm]) for the main gRPC client and server
- Schema-first protobuf definitions with code generation
  - `ts-proto` ([npm][ts-proto-npm]) for TypeScript codegen
  - `@bufbuild/buf` ([npm][bufbuild-buf-npm]) for CLI build using `ts-proto`
- Schema linting for best practices
  - `@bufbuild/buf` ([npm][bufbuild-buf-npm]) for CLI linting and lint rules definition
- Server reflection for introspection from client
  - `nice-grpc-server-reflection` ([npm][nice-grpc-server-reflection-npm]) to enable reflection in the server
  - `@bufbuild/buf` ([npm][bufbuild-buf-npm]) for CLI generation of binaries needed for server reflection
- Code generation for client with reflection
  - `fullstorydev/grpcurl` ([github][grpcurl-github]) for server reflection from client
  - `@bufbuild/buf` ([npm][bufbuild-buf-npm]) for CLI client codegen from reflection binaries
- Server health check procedures
  - `nice-grpc-server-health` ([npm][nice-grpc-server-health-npm]) for implementation of [gRPC health v1][health-v1-procedures] standard
- Server middlewares
  - `nice-grpc-server-terminator` ([npm][nice-grpc-server-middleware-terminator-npm]) to facilitate server graceful shutdown
- Client middlewares
  - `nice-grpc-client-middleware-deadline` ([npm][nice-grpc-client-middleware-deadline-npm]) for cancelling calls upon deadlines
  - `nice-grpc-client-middleware-retry` ([npm][nice-grpc-client-middleware-retry-npm]) for automatic retries to idempotent calls
- OpenTelemetry tracing
  - `nice-grpc-opentelemetry` ([npm][nice-grpc-opentelemetry-npm]) for server tracing with OpenTelemetry instrumentation

## Requirements

- Node.js 20.x (if not using `direnv` with `nix-shell`)
- Docker for usage of [grpcurl][grpcurl-github] to run client introspection of server reflection

## Setup

1. (Optional) If using `direnv` with `nix-shell`, run `direnv allow`
2. Run `npm install` to install dependencies
3. For `./server` and `./client`, run `cp .env.sample .env` to create environment files
4. In both `.env` files, replace `<server-token-here>` with the same string to use as auth token

## Usage

### Server

- `npm run dev`: to start the server for development in watch mode
- `npm run serve`: to build and start the server in production mode
- `npm run build`: to codegen the Protobuf schema and build the source
- `npm run proto:build`: to only codegen the Protobuf schema
- `npm run server:build`: to only build the server source
- `npm start`: to start the server in production mode (manual `build` is needed before)

### Client

To run the client, the server must be running in the address specified in
the `.env` file (`localhost:50051` by default).

- `npm run dev`: to start the client in development in watch mode
- `npm run serve`: to build and start the client in production mode
- `npm run proto`: to run the client codegen from server reflection (requires Docker)
- `npm run build`: to build the client source
- `npm start`: to start the client in production mode (manual `build` is needed before)

[bufbuild-buf-npm]: https://www.npmjs.com/package/@bufbuild/buf
[grpcurl-github]: https://github.com/fullstorydev/grpcurl
[health-v1-procedures]: https://github.com/grpc/grpc-proto/blob/a9c639a9a4bddf74bcbd819acc871fa8ad2b8a81/grpc/health/v1/health.proto
[nice-grpc-npm]: https://www.npmjs.com/package/nice-grpc
[nice-grpc-opentelemetry-npm]: https://www.npmjs.com/package/nice-grpc-opentelemetry
[nice-grpc-client-middleware-deadline-npm]: https://www.npmjs.com/package/nice-grpc-client-middleware-deadline
[nice-grpc-client-middleware-retry-npm]: https://www.npmjs.com/package/nice-grpc-client-middleware-retry
[nice-grpc-server-health-npm]: https://www.npmjs.com/package/nice-grpc-server-health
[nice-grpc-server-reflection-npm]: https://www.npmjs.com/package/nice-grpc-server-reflection
[nice-grpc-server-middleware-terminator-npm]: https://www.npmjs.com/package/nice-grpc-server-middleware-terminator
[ts-proto-npm]: https://www.npmjs.com/package/ts-proto
