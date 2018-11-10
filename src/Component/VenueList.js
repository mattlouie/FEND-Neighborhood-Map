import React, { Component } from "react";
import VenueItem from "./VenueItems";

const VenueList = ({ venues, handleVenueClick, infowindow, content, ven }) => {
  return (
    <ol id="venueList">
      {venues &&
        venues.map((venue, venueKey) => (
          <VenueItem
            key={venueKey}
            venue={venue}
            handleVenueClick={handleVenueClick}
            infowindow={infowindow}
            content={content}
          />
        ))}
    </ol>
  );
};

export default VenueList;
