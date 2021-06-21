import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchTrendingMovies } from "../../services/movieApi/movieApi";
import hps from "./HomePage.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Button from "../../components/Button/Button";

class HomePage extends Component {
  state = {
    movies: [],
    page: 1,
    error: false,
    fetchLength: 0,
    isLoading: false,
  };
  componentDidMount() {
    this.getTrendingMovies();
  }
  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;

    if (page !== prevState.page) {
      this.getTrendingMovies();
    }
  }

  getTrendingMovies = (prevProps, prevState) => {
    const { page } = this.state;

    this.setState({ isLoading: true });
    fetchTrendingMovies(page)
      .then(({ results }) => {
        this.setState((prevState) => ({
          movies: [...prevState.movies, ...results],
          fetchLength: results.length,
        }));
      })
      .catch((error) => {
        this.setState({ error: true });
      })
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement,
          behavior: "smooth",
        });
      });
  };
  setNewPage = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { movies, isLoading, fetchLength } = this.state;
    const { location } = this.props;
    return (
      <div>
        <h1>Trending today</h1>
        {isLoading && (
          <Loader
            type="ThreeDots"
            color="#3f51b5"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        <ul className={hps.movieList}>
          {movies &&
            movies.map((movie) => {
              return (
                <li className={hps.movieItem} key={movie.id}>
                  <Link
                    to={{
                      pathname: `${this.props.match.url}movies/${movie.id}`,
                      state: { from: location },
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt=""
                    />
                    {/* {movie.title} */}
                  </Link>
                </li>
              );
            })}
        </ul>
        {fetchLength === 20 && !isLoading && (
          <Button getNewPage={this.setNewPage} />
        )}
      </div>
    );
  }
}
export default HomePage;
