import "reflect-metadata"
import express, { Express, NextFunction, Request, Response, Router } from 'express';
import compression from 'compression';
import cors from 'cors';
import http, { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import { EventEmitter } from 'events';
import { Config } from './lib/Config';
import * as path from 'path';
import { RouterPath } from './types/RouterPath';
import HttpException from './exceptions/HttpException';
import { createMoviesEndpoints } from './endpoints/movies';
import { Watcher } from './lib/Watcher';
import { createAuthEndpoints } from './endpoints/auth';
import { Job } from './lib/job/Job';
import { createUserEndpoints } from './endpoints/user';
import { createShowsEndpoints } from './endpoints/shows';
import { createPingEndpoints } from './endpoints/ping';
import { createImageEndpoints } from './endpoints/image';
import { createMovieEndpoints } from './endpoints/movie';
import { createGenreEndpoints } from './endpoints/genre';
import { createVideoEndpoints } from './endpoints/video';
import transcodingManager from './lib/transcodings/TranscodingManager';
import { createMetadataEndpoints } from './endpoints/metadata';
import { createShowEndpoints } from './endpoints/show';
import { createSearchEndpoints } from './endpoints/search';
import { Log } from './lib/Logger';
import { AppDataSource } from "./DataSource";
import { MovieRepository } from "./repositories/MovieRepository";
import { ShowRepository } from "./repositories/ShowRepository";
import { SeasonRepository } from "./repositories/SeasonRepository";
import { EpisodeRepository } from "./repositories/EpisodeRepository";
import { LibraryRepository } from "./repositories/LibraryRepository";

export class Server {
  private app: Express;
  private server: HttpServer;
  private io: IOServer;
  private config: Config;
  private watcher: Watcher;
  private jobs: Job[];
  private emitter: EventEmitter;

  constructor(app: Express) {
    this.app = app;
    this.server = http.createServer(this.app);
    this.setupMiddlewares();
    this.io = new IOServer(this.server);
    this.jobs = [];
    this.emitter = new EventEmitter();

    const configPath = path.join(process.env.TEMP_DIRECTORY || '', 'config.json');
    this.config = new Config(configPath);
    transcodingManager.setConfig(this.config);
    this.watcher = new Watcher();
  }


  private initializePublicAPIEndpoints() {
    const endpoints: RouterPath[] = [
      createPingEndpoints(this.config, this.emitter),
      createImageEndpoints(this.config, this.emitter),
      createAuthEndpoints(this.config, this.emitter),
      createMoviesEndpoints(this.config, this.emitter),
      createMovieEndpoints(this.config, this.emitter),
      createGenreEndpoints(this.config, this.emitter),
      createShowsEndpoints(this.config, this.emitter),
      createShowEndpoints(this.config, this.emitter),
      createUserEndpoints(this.config, this.emitter),
      createVideoEndpoints(this.config, this.emitter),
      createMetadataEndpoints(this.config, this.emitter),
      createSearchEndpoints(this.config, this.emitter)
    ];
    const apiRouter = Router();
    endpoints.forEach(({ router, path }) => apiRouter.use(path, router));
    this.app.use('/api', apiRouter);
  }

  private setupMiddlewares() {
    this.app.use(compression());
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

  private setupJobs() {
    /*
    this.jobs.push(
      new PopularMovieJob(this.repository),
      new ScanForTrailerJob(this.repository),
      new ExtractSubtitlesJob(this.repository, this.emitter)
    );
    this.jobs.map(job => job.start());
    */
  }

  private async syncDatabase() {
    Log.info('Syncing database..');
    await LibraryRepository.sync();
    await MovieRepository.sync();
    await ShowRepository.sync();
    await SeasonRepository.sync();
    await EpisodeRepository.sync();
    Log.info('Database sync complete!');
  }

  async start() {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    await this.syncDatabase();
    this.initializePublicAPIEndpoints();
    this.watcher.start(this.emitter);
    this.setupJobs();
    this.setupErrorHandling();
  }
}