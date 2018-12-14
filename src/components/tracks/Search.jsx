import React, { Component } from "react";
import { Consumer } from "./../../context";
import axios from "axios";
class Search extends Component {
  state = { 
    trackTitle: "",
    artistName: "",
    pageSize: 10,
    findSongs: "Find Songs"
   };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  findTrack = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?f_has_lyrics=1&q_track=${
          this.state.trackTitle
        }&q_artist=${this.state.artistName}&page_size=${this.state.pageSize}&page=1&s_track_rating=desc&apikey=${process.env
          .REACT_APP_MM_KEY || "Your MusixMatch API Key"}`
      )
      .then(res => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list
        });
        const size = this.state.pageSize;
        this.setState({ trackTitle: "", artistName: "", pageSize: size + 9, findSongs: "Find More Songs"});

      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return <div className="mb-4">
              <h2 className="display-4 text-center">
                get lyrics for any song
              </h2>
              <form className="mt-4" onSubmit={this.findTrack.bind(this, dispatch)}>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg text-center mb-2" placeholder="Search by Title" name="trackTitle" onChange={this.onChange} value={this.state.trackTitle} />
                  <input type="text" className="form-control form-control-lg text-center mt-2" placeholder="Search by Artist" name="artistName" onChange={this.onChange} value={this.state.artistName} />
                </div>
                <button className="btn btn-dark btn-lg btn-block mb-4" type="submit">
                  {this.state.findSongs}
                </button>
              </form>
            </div>;
        }}
      </Consumer>
    );
  }
}

export default Search;
