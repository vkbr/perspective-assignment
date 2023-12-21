import { createServer } from 'node:http';
import app from './app';

const port = parseInt(process.env.PORT ?? '8080', 10);

const server = createServer(app);

server.listen(port, '0.0.0.0', () => {
  console.log(`Running at http://localhost:${port} or http://0.0.0.0:${port}`);
});

process.on('SIGUP', () => {
  console.debug('SIGUP');
  server.close();
});

process.on('SIGINT', () => {
  console.debug('SIGINT');
  server.close();
});
