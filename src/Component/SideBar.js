import React, { Component } from "react";
import VenueList from './VenueList';

class SideBar extends Component {
  constructor() {
    super();
    this.state = {
      query: "",
    };
  }

  filterVenueListings = () => {
    if (this.state.query.trim !== "") {
      const venues = this.props.venues.filter((venueListing) =>
        venueListing.venue.name
          .toLowerCase()
          .includes(this.state.query.toLowerCase())
      );
      return venues;
    }
    return this.props.venues;
  };

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
    const markers = this.props.venues.map((venue) => {
      const firstMatched = venue.venue.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
      const marker = this.props.markers.find(
        (marker) => marker.id === venue.venue.id
      );
      if (firstMatched) {
        marker.setVisible(true);
      } else {
        marker.setVisible(false);
      }
      return marker;
    });
    this.props.updateSuperState({ markers: markers });
  };

  render() {
    return (
      <aside id="sidebarContainer">
        <h1 id="sidebarHeader">
        </h1>
        <label class="searchHeader" htmlFor="filter">Search Venue Listings</label>
        <input
          id="filter"
          type="search"
          placeholder="ex. Blue Bottle"
          onChange={this.handleInputChange}
        />
        <VenueList
          {...this.props}
          handleVenueClick={this.props.handleVenueClick}
          venues={this.filterVenueListings()}
        />
      </aside>
    );
  }
}

export default SideBar;
