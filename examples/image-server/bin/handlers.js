// event listener for HTTP server 'error' event.
const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(error.port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(error.port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// event listener for HTTP server 'listening' event.
const onListening = (host, port) => {
  console.log(`API is running at http://${host}:${port}, NODE_ENV is ${process.env.NODE_ENV}`);
};

module.exports = {
  onError,
  onListening,
};
