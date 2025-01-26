const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { getAnagramsByTitle } = require('./database');

const PROTO_PATH = './anagram.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const anagramProto = grpc.loadPackageDefinition(packageDefinition).anagramService;

async function GetAnagramsByTitle(call, callback) {
  const title = call.request.title;

  try {
    const anagrams = await getAnagramsByTitle(title);
    callback(null, { anagrams });
  } catch (error) {
    console.error('Error in gRPC handler:', error);
    callback({
      code: grpc.status.INTERNAL,
      message: 'An error occurred while processing the request.',
    });
  }
}



function main() {
  const server = new grpc.Server();
  server.addService(anagramProto.AnagramService.service, {
    GetAnagramsByTitle,
  });

  const PORT = '50051';
  server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
      console.error('Error starting server:', err);
      return;
    }
    console.log(`gRPC server running on port ${port}`);
  });
}

main();