import React from "react";
import { useGetMovieInfoQuery, useGetRandomMovieQuery, useListMoviesQuery } from "../movieApiSlice";
import { maybeClassName } from "../../../../utils/css";

export interface RandomMovieTrailerProps {
  movieId: number;
  className?: string;
  videoClassName?: string;
  infoClassName?: string;
}

export const RandomMovieTrailer: React.FC<RandomMovieTrailerProps> = ({
  movieId,
  className,
  videoClassName,
  infoClassName,
}) => {
  const { data: movie, isError, isLoading, isSuccess, error } = useListMoviesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      movie: data?.find((movie) => movie.id === movieId),
    })
  });

  if (isError) {
    console.error("Error fetching movie data", error);
    return <div />;
  }
  if (isLoading) {
    return <div />;
  }

  const renderLogoOrText = () => {
    if (movie.logoId) {
      return <img className="max-w-screen-sm" src={`/api/image/${movie.logoId}`} alt="logo" />;
    }
    return <h1 className="text-4xl text-shadow shadow-black">{movie.title}</h1>;
  }
  if (isSuccess) {
    return (
      <div className={className}>
        <video loop autoPlay muted className={`object-cover ${maybeClassName(videoClassName)}`}>
          <source src={`/api/movie/${movie.id}/trailer`} type="video/mp4" />
        </video>

        <div className={`absolute left-10 bottom-10 flex flex-col gap-5 animate-drop-down ${maybeClassName(infoClassName)}`}>
          {renderLogoOrText()}
          <p className="animate-fade-in max-w-screen-md text-shadow shadow-black">{movie.overview}</p>
        </div>
      </div>
    );
  }
};
