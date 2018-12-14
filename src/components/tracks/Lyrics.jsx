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
        }&apikey=${process.env.REACT_APP_MM_KEY || "Your MusixMatch API Key"}`
      )
      .then(res => {
        this.setState({
          lyrics: res.data.message.body.lyrics
        });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${
            this.props.match.params.id
          }&apikey=${process.env.REACT_APP_MM_KEY || "Your MusixMatch API Key"}`
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
          <div className="display-flex">
            <Link to="/" className="btn btn-dark float-left">
              <i className="fas fa-chevron-left" /> <span>Back</span>
            </Link>
            <a
              href="https://github.com/sudiptog81/lyricsfinder/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-dark float-right"
            >
              <span>Code</span> <i className="fas fa-chevron-right" />
            </a>
          </div>
          <h1
            className="h1 text-center display-block"
            style={{ paddingTop: "50px", paddingBottom: "16px" }}
          >
            {track.track_name} by{" "}
            <span className="text-secondary">{track.artist_name}</span>
          </h1>
          <div className="card">
            <div className="card-body">
              <p className="card-text" style={{ whiteSpace: "pre-wrap" }}>
                {lyrics.lyrics_body}
                <br />
                <span className="text-muted">{lyrics.lyrics_copyright}</span>
              </p>
            </div>
          </div>

          <ul className="list-group mt-3 mb-3">
            <li className="list-group-item">
              <i className="fas fa-headphones-alt" />
              &nbsp;&nbsp;<strong>Album Name</strong>: {track.album_name}
            </li>
            <li className="list-group-item">
              <i className="far fa-calendar-plus" />
              &nbsp;&nbsp;<strong>Release Year</strong>:{" "}
              <Moment format="YYYY">{track.first_release_date}</Moment>
            </li>
          </ul>
        </React.Fragment>
      );
    }
  }
}

export default Lyrics;
