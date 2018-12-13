import React, { Component } from "react";
import { Consumer } from "./../../context";
import axios from "axios";
class Search extends Component {
  state = { trackTitle: "" };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  findTrack = (dispatch, e) => {
    e.preventDefault();
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${
          this.state.trackTitle
        }&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.MM_KEY}`
      )
      .then(res => {
        dispatch({
          type: "SEARCH_TRACKS",
          payload: res.data.message.body.track_list
        });
        this.setState({ trackTitle: "" });
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="mb-4">
              <h2 className="display-4 text-center">get lyrics for any song</h2>
              <form
                className="mt-4"
                onSubmit={this.findTrack.bind(this, dispatch)}
              >
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg text-center"
                    placeholder="Search by Title"
                    name="trackTitle"
                    onChange={this.onChange}
                    value={this.state.trackTitle}
                  />
                </div>
                <button
                  className="btn btn-dark btn-lg btn-block mb-4"
                  type="submit"
                >
                  Find Songs
                </button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Search;
