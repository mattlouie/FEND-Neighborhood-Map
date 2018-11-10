
import React, { Component } from "react";

class VenueItems extends Component {
  render() {
    return (
      <li
        tabIndex="0"
        className="venueItem"
        onClick={() => this.props.handleVenueClick(this.props)}
      >

        {this.props.venue.venue.name}
      </li>
    );
  }
}

export default VenueItems
;
