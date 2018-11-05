import React, { Component } from 'react';
import './App.css';
import './Map.js';
import axios from 'axios';

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAScDtRiY0-quySYzKD2w_tlAl3G4IpiLQ&callback=initMap")
    window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "ZHAYJAWWRZRJ2CX3WIAAX3SS4BBSHO5CYPKAWXHG3XDHKBOI",
      client_secret: "ALY3T2OKQT2MMJYLVXRM1WRWAHAL02BRKU4W5A5OPNVMC5SA",
      query: "coffee",
      near: "San Francisco, CA",
      v: "20180323"
    }
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

  initMap = () => {
    // eslint-disable-next-line
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.773972, lng: -122.431297},
      zoom: 13
    })

    var infowindow = new window.google.maps.InfoWindow({
    })

  //  this.state.venues.map(myVenue => {

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

      // * Pushes markers to state after they have been created`
    //  this.setState(() => this.state.markers.push(marker));

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

    /*  var marker = new window.google.maps.Marker ({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map
      }) */

      marker.addListener('click', function() {

        infowindow.setContent(content);

        infowindow.open(map, marker);
      })

    })
  }

  render() {
    return (
      <main>
        <div id='map'>
        </div>
      </main>
    )
  }
}

  /*
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAScDtRiY0-quySYzKD2w_tlAl3G4IpiLQ&callback=initMap"
  async defer></script>
  */

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
