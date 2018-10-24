import React, { Component } from 'react';
import './App.css';
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

    this.state.venues.map(myVenue => {
      var marker = new window.google.maps.Marker ({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map
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
