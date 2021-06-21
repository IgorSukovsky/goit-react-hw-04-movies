import React, { Component } from "react";
import { fetchCastOfMovie } from "../../services/movieApi/movieApi";
import cs from "./Cast.module.css";
class Cast extends Component {
  state = {
    cast: [],
    error: false,
  };
  componentDidMount() {
    this.getCastOfMovie();
  }

  getCastOfMovie = () => {
    const { movieId } = this.props.match.params;

    fetchCastOfMovie(movieId)
      .then((result) => {
        this.setState({
          cast: result.cast,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };
  render() {
    const { cast } = this.state;

    if (cast.length > 0) {
      return (
        <div>
          <h3>Cast</h3>
          <ul className={cs.castList}>
            {cast &&
              cast.map((el) => {
                const { id, name, profile_path, character } = el;
                return (
                  <li key={id} className={cs.castItem}>
                    <img
                      src={
                        profile_path
                          ? `https://image.tmdb.org/t/p/w300${profile_path}`
                          : `https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png`
                      }
                      alt={name}
                      className={cs.castImage}
                    />

                    <h3>{name}</h3>
                    <p>Character: {character}</p>
                  </li>
                );
              })}
          </ul>
        </div>
      );
    } else {
      return <p>We don't have cast for this movie.</p>;
    }
  }
}
export default Cast;
