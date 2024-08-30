import { Job } from "./Job";
import fs from 'fs';
import path from 'path';
import { Log } from "../Logger";
import { LibraryRepository } from "../../repositories/LibraryRepository";
import { MovieRepository } from "../../repositories/MovieRepository";

export class ScanForTrailerJob extends Job {
  constructor() {
    super({
      useInterval: true,
      intervalMs: 43200000, // Every 12 hour
      runAtStart: true
    })
  }

  protected async execute(): Promise<void> {
    const libraries = await LibraryRepository.find();
    libraries.forEach(library => this.scanLibrary(library.path, library.id));
  }

  private async scanLibrary(dir: string, libraryId: number) {
    const files = await this.readDir(dir);
    const trailers = files.filter(file => path.parse(file.name).name === 'trailer');
    const allMovies = await MovieRepository.findByLibraryId(libraryId)
      .then(movies => movies.filter(movie => movie.trailerPath === null));

    for (const trailer of trailers) {
      const relativePath = path.relative(dir, trailer.path);
      const fullPath = path.join(trailer.path, trailer.name);
      const movie = allMovies.find(movie => path.parse(movie.path).dir === relativePath);
      if (movie) {
        movie.trailerPath = fullPath;
        await MovieRepository.save(movie);
        Log.info(`Found trailer for movie ${movie.name}`);
      }
    }
  }

  private readDir(dir: string) {
    return fs.promises.readdir(dir, {
      withFileTypes: true,
      recursive: true
    }).then(files => files.filter(file => file.isFile()));
  }
}