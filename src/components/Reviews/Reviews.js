import React, { Component } from "react";

import { fetchReviewsOfMovie } from "../../services/movieApi/movieApi";
import rs from "./Reviews.module.css";
class Reviews extends Component {
  state = {
    reviews: [],
    error: false,
  };
  componentDidMount() {
    this.getReviewsOfMovie();
  }

  componentWillUnmount() {
    this.setState({
      reviews: [],
      error: false,
    });
  }
  getReviewsOfMovie = (prevProps, prevState) => {
    const { movieId } = this.props.match.params;

    fetchReviewsOfMovie(movieId)
      .then((result) => {
        this.setState({
          reviews: result.results,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };
  render() {
    const { reviews } = this.state;

    if (reviews.length > 0) {
      return (
        <div>
          <h3>Reviews</h3>
          <ul className={rs.reviewsList}>
            {reviews.map((el) => {
              const { author, content, id } = el;
              return (
                <li key={id} className={rs.reviewsItem}>
                  <h3>{author}</h3>
                  <p>{content}</p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      return <p>We don't have any reviews for this movie.</p>;
    }
  }
}
export default Reviews;
