import React, { Component } from 'react';
import './App.css';
import Map from './Component/Map';
import Header from './Component/Header';
import SideBar from './Component/SideBar';
import axios from 'axios';


class App extends Component {

  state = {
    venues: [],
    markers: [],
  }

  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAScDtRiY0-quySYzKD2w_tlAl3G4IpiLQ&callback=initMap")
    window.initMap = this.initMap
  }

/* Uses FourSquare to get search parameters */
  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "ZHAYJAWWRZRJ2CX3WIAAX3SS4BBSHO5CYPKAWXHG3XDHKBOI",
      client_secret: "ALY3T2OKQT2MMJYLVXRM1WRWAHAL02BRKU4W5A5OPNVMC5SA",
      query: "coffee",
      near: "San Francisco, CA",
      v: "20180323"
    }
/* Use Axios to request data */
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log(error)
      })

  }

  handleVenueClick = (venueListItem) => {
    const marker = this.state.markers;
    let content = `
      <div class="infowindow">
      <h1 class = "infoHeader">
        ${venueListItem.venue.venue.name}
      </h1>
      <p>
        ${venueListItem.venue.venue.location.formattedAddress[0]}
      </p>
      <p>
        ${venueListItem.venue.venue.location.formattedAddress[1]}
      </p>
      <p>
        <a href='https://foursquare.com/v/${
          venueListItem.venue.venue.id
        }' target="blank">More Info</a>
        </p>
      </div>`;
    marker.filter((marker) => {
      if (marker.id === venueListItem.venue.venue.id) {
        this.state.infowindow.setContent(content);
        this.state.infowindow.open(this.initMap, marker);
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
      } else {
        marker.setAnimation(null);
      }
    });
  };

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.773972, lng: -122.431297},
      zoom: 13
    })

    var infowindow = new window.google.maps.InfoWindow({
    })

/* Loops over venue items and makes markers for them */

    this.state.venues.map((index) => {
      let position = {
        lat: index.venue.location.lat,
        lng: index.venue.location.lng,
      };
      let title = index.venue.name;
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        animation: window.google.maps.Animation.DROP,
        id: index.venue.id,
      });

/* Add information that is displayed in infowindow */

      let content = `
              <div class="infowindow">
              <h1 class = "infoHeader">
                ${index.venue.name}
              </h1>
              <p>
                ${index.venue.location.formattedAddress[0]}
              </p>
              <p>
                ${index.venue.location.formattedAddress[1]}
              </p>
              <p>
              <a href="https://foursquare.com/v/${
                index.venue.id
              }" target="blank">More Info</a>
              </p>
              </div>`;


      marker.addListener('click', function() {

        infowindow.setContent(content);

        infowindow.open(map, marker);
      })

    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main id="main">
            <SideBar {...this.state} handleVenueClick={this.handleVenueClick} />
            <Map {...this.state} />
        </main>
      </div>
    )
  }
}



function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
