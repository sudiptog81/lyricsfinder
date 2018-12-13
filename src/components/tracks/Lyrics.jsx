import React, { Component } from "react";
import axios from "axios";
import Spinner from "../layouts/Spinner";
import { Link } from "react-router-dom";
import Moment from "react-moment";
class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  };

  componentDidMount() {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${
          this.props.match.params.id
        }&apikey=fd37681ed97e7a0f98678e795ec74f12`
      )
      .then(res => {
        this.setState({
          lyrics: res.data.message.body.lyrics
        });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=fd37681ed97e7a0f98678e795ec74f12`
        );
      })
      .then(res => {
        this.setState({
          track: res.data.message.body.track
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { track, lyrics } = this.state;
    if (
      track === undefined ||
      lyrics === undefined ||
      Object.keys(track).length === 0 ||
      Object.keys(lyrics).length === 0
    ) {
      return <Spinner />;
    } else {
      return (
        <React.Fragment>
          <Link to="/" className="btn btn-dark mb-4">
            <i className="fas fa-chevron-left" /> Back
          </Link>
          <h1 className="h1 text-center mb-4 mt-0">
            {track.track_name} by{" "}
            <span className="text-secondary">{track.artist_name}</span>
          </h1>
          <div className="card">
            <div className="card-body">
              <p className="card-text">{lyrics.lyrics_body}</p>
            </div>
          </div>

          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>Album Name</strong>: {track.album_name}
            </li>
            {/* <li className="list-group-item">
              <strong>Genre</strong>:{" "}
              {
                track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name
              }
            </li>
            <li className="list-group-item">
              <strong>Explicit Words</strong>:{" "}
              {track.explicit === 0 ? "Yes" : "No"}
            </li> */}
            <li className="list-group-item">
              <strong>Release Year</strong>:{" "}
              <Moment format="YYYY">{track.first_release_date}</Moment>
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
