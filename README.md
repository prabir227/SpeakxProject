# Question Finder

A web application that allows users to search and find questions stored in a database with ease.

## Features
- Search functionality using gRPC and MongoDB.
- Seamless communication between frontend and backend via gRPC-Web Proxy.
- Hosted version available for direct use.

## Prerequisites
Make sure the following are installed on your system:
- Node.js
- Golang

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

### Setting Up gRPC-Web Proxy
1. Install `grpcwebproxy` using Golang:
   ```bash
   go install github.com/improbable-eng/grpc-web/go/grpcwebproxy@latest
   ```
2. Add `grpcwebproxy` to your environment variable:
   - For Linux:
     ```bash
     export PATH=$PATH:$(go env GOPATH)/bin
     ```
3. Create a `.sh` file and paste the following script inside it:
   ```bash
   #!/bin/bash
   grpcwebproxy \
   --backend_addr=localhost:50051 \
   --run_tls_server=false \
   --server_http_debug_port=8080 \
   --allow_all_origins
   ```
4. Run the `.sh` file to start the gRPC-Web Proxy server.

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
   - If you encounter an error like `npm ERR ERESOLVE`, run:
     ```bash
     npm config set legacy-peer-deps true
     ```
     Then retry:
     ```bash
     npm install
     ```
3. Start the frontend server:
   ```bash
   npm start
   ```

The frontend will open in your browser, and you can search for questions using the provided interface.

## Hosted Version
Skip the setup and use the hosted version of the website directly:  
[Question Finder Hosted Version](http://13.202.8.121:3000/)

Simply enter your query in the search bar and click the search button to view the results.

## Built With
- **Node.js** - Backend development
- **gRPC** - Communication protocol
- **MongoDB** - Database
- **React** - Frontend development
- **gRPC-Web Proxy** - Bridging HTTP/1.1 and HTTP/2 communication



