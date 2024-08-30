import { serverApiSlice } from "../serverApiSlice";

type TestMovieType = {
  id: number;
};

export enum MovieListQueryTypes {
  Popular = 'popular',
  Genre = 'genre',
  All = 'all'
}

export interface MovieListQueryParams {
  orderBy?: string;
  limit?: number;
  offset?: number;
  type: MovieListQueryTypes;
};

export interface MovieListByGenreQueryParams extends MovieListQueryParams {
  genre: string;
};

const isListByGenre = (params: MovieListQueryParams): params is MovieListByGenreQueryParams =>
  params.type === MovieListQueryTypes.Genre && (params as MovieListByGenreQueryParams).genre !== undefined;

const movieApiSlice = serverApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRandomMovie: build.query<TestMovieType, boolean>({
      query: (requireTrailer: boolean) => `movies/random?requireTrailer=${requireTrailer}`, // TODO: Change to only return ID?
      providesTags: (result, error) => result === undefined ? [] : [{ type: 'Movie', id: result.id }],
    }),
    listMovies: build.query<TestMovieType[], MovieListQueryParams>({
      query: (params: MovieListQueryParams) => {
        const { orderBy, limit, offset, type } = params;
        let url = '';
        if (isListByGenre(params)) {
          url = `movies/genre/${params.genre}`;
        } else if (type === MovieListQueryTypes.Popular) {
          url = `movies/list/popular}`;
        } else if (type === MovieListQueryTypes.All) {
          url = `movies/list`;
        } else {
          throw new Error('Invalid type');
        }
        return `${url}?orderBy=${orderBy}&limit=${limit}&offset=${offset}`;
      },
      providesTags: (result, error) =>result?.map(({ id }) => ({ type: 'Movie', id })) ?? [],
    })
  }),
  overrideExisting: false,
});

export const { useGetRandomMovieQuery, useListMoviesQuery } = movieApiSlice;