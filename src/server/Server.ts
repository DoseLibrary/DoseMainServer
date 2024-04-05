import express, { Express, NextFunction, Request, Response, Router } from 'express';
import { AppDataSource } from './AppDataSource';
import cors from 'cors';
import { RouterPath } from './types/RouterPath';
import { createAuthEndpoints } from './endpoints/auth';
import HttpException from './exceptions/HttpException';

export class Server {
  private app: Express;

  constructor(app: Express) {
    this.app = app;
    this.setupMiddlewares();
  }

  private initializeApiEndpoints() {
    const endpoints: RouterPath[] = [
      createAuthEndpoints(),
    ];
    const apiRouter = Router();
    endpoints.forEach(({ router, path }) => apiRouter.use(path, router));
    this.app.use('/api', apiRouter);
  }

  private setupMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  // Always call this function after all other endpoints/middlewares have been setup
  private setupErrorHandling() {
    // 404
    this.app.all('/api/*', (req: Request, res: Response) => {
      res.status(404).json({
        message: '404 not found'
      });
    });

    // Thrown errors
    this.app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof HttpException) {
        res.status(err.status).json({
          message: err.message,
          additionalInfo: err.info
        });
      } else {
        console.log('Unknown error detected', err);
        res.status(500).json({
          message: 'An unknown error occured'
        });
      }
    });
  }

  public async start() {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    this.initializeApiEndpoints();
    this.setupErrorHandling();

    if (!process.env['VITE']) // When running from `vite` there is no need to call `app.listen`
      this.app.listen(3002, () => console.log("Started server on http://localhost:3002"));
  }
}
