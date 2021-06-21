import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchMoviesByQuery } from "../../services/movieApi/movieApi";
import hps from "../HomePage/HomePage.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Searchbar from "../../components/Searchbar/Searchbar";
import Button from "../../components/Button/Button";

class MoviesPage extends Component {
  state = {
    movies: [],
    page: 1,
    query: "",
    error: false,
    fetchLength: 0,
    isLoading: false,
  };
  componentDidMount() {
    const searchQuery = this.props.location.search;
    const query = searchQuery.slice(7);

    if (query) {
      this.setState({ query: query, page: 1 });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query && query !== "") {
      this.getMoviesByQuery(query);
    } else if (query === prevState.query && page !== prevState.page) {
      this.getMoviesByQuery(query);
    }
  }

  getQueryByForm = ({ query }) => {
    query && this.setState({ query: query, page: 1 });

    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  };

  getMoviesByQuery = () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    fetchMoviesByQuery(query, page)
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
        <Searchbar onSubmit={this.getQueryByForm} />
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
                      pathname: `${this.props.match.url}/${movie.id}`,
                      state: { from: location },
                    }}
                  >
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt=""
                    />
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

export default MoviesPage;
