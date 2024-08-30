import { RandomMovieTrailer } from "../../features/server/movie/components/RandomMovieTrailer";
import { MovieListQueryTypes, useGetRandomMovieQuery, useListMoviesQuery } from "../../features/server/movie/movieApiSlice";

export const DashboardView = () => {
  const { data: movie, isError, isLoading, isSuccess, error } = useGetRandomMovieQuery(true);
  const { data: popularMovies } = useListMoviesQuery({ type: MovieListQueryTypes.Popular });
  console.log(popularMovies);

  if (isError) {
    console.error("Error fetching random movie", error);
    return <div />;
  }
  if (isLoading) {
    return <div/>;
  }

  if (isSuccess) {
    return (
      <>
        <RandomMovieTrailer
          movieId={movie.id}
          videoClassName="max-h-screen w-full"
        />
      </>
    );
  }
};