import express from 'express';
import { Server } from './Server';

export const app = express();

console.log('hello');
const server = new Server(app);
server.start();

if (!process.env['VITE']) // When running from `vite` there is no need to call `app.listen`
  app.listen(3002, () => console.log("Started server on http://localhost:3002"));
