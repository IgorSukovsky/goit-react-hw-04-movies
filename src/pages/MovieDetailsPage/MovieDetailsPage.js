import React, { Component, Suspense, lazy } from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";
import { fetchDetailsOfMovie } from "../../services/movieApi/movieApi";
import mdps from "./MovieDetailsPage.module.css";

import routes from "../../routes";
const Cast = lazy(() => import("../../components/Cast/Cast"));
const Reviews = lazy(() => import("../../components/Reviews/Reviews"));
class MovieDetailsPage extends Component {
  state = {
    movieDetails: {},
    error: null,
  };
  componentDidMount() {
    this.getDetailsOfMovie();
  }

  componentWillUnmount() {
    this.setState({
      movieDetails: {},
    });
  }
  getDetailsOfMovie = (prevProps, prevState) => {
    const { movieId } = this.props.match.params;
    fetchDetailsOfMovie(movieId)
      .then((result) => {
        this.setState({
          movieDetails: result,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };
  handleGoBack = () => {
    const { history, location } = this.props;
    if (location.state && location.state.from) {
      history.push(location.state.from);
    } else {
      history.push(routes.home);
    }
  };
  render() {
    const { poster_path, title, vote_average, overview, genres } =
      this.state.movieDetails;
    const { match, location } = this.props;

    const from = location.state.from;

    return (
      <div className="container">
        <button
          className={mdps.backBtn}
          type="button"
          onClick={this.handleGoBack}
        >
          Go back
        </button>
        <div className={mdps.box}>
          {poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt={title}
              className={mdps.image}
            />
          )}

          <div>
            <h2>{title}</h2>
            <p>User Score: {vote_average * 10}%</p>
            <h3>Overview</h3>
            <p>{overview}</p>
            <h3>Genres</h3>
            <ul className={mdps.genreList}>
              {genres &&
                genres.map((genre) => (
                  <li key={genre.id} className={mdps.genreItem}>
                    <p>{genre.name}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <ul className={mdps.linksBox}>
          <li>
            <NavLink
              to={{
                pathname: `${match.url}/cast`,
                state: { from: from },
              }}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={{
                pathname: `${match.url}/reviews`,
                state: { from: from },
              }}
            >
              Reviews
            </NavLink>
          </li>
        </ul>
        <Suspense>
          <Switch>
            <Route path={`${match.path}/cast`} component={Cast}></Route>
            <Route path={`${match.path}/reviews`} component={Reviews}></Route>
          </Switch>
        </Suspense>
      </div>
    );
  }
}
export default withRouter(MovieDetailsPage);
